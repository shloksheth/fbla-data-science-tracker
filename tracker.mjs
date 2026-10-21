import { units, objectives } from './objectives.mjs';
export const statuses = ['Not started', 'Learning', 'Reviewing', 'Ready'];
const known = new Set(objectives.map(o => o.id));
export function dayKey(date = new Date()) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}
function plusDays(day, count) {
  const [y,m,d] = day.split('-').map(Number);
  return dayKey(new Date(y,m - 1,d + count));
}
export function validateTracker(value) {
  if (!value || typeof value !== 'object' || !value.records || typeof value.records !== 'object' || !Array.isArray(value.logs)) throw new Error('Invalid tracker backup.');
  const records = {};
  for (const [id, row] of Object.entries(value.records)) {
    if (!known.has(id)) continue;
    if (!row || !statuses.includes(row.status)) throw new Error('Invalid objective status in backup.');
    records[id] = { status: row.status, notes: String(row.notes || ''), updatedAt: Number(row.updatedAt) || 0 };
  }
  const logs = value.logs.map(log => {
    if (!known.has(log.objectiveId) || !/^\d{4}-\d{2}-\d{2}$/.test(log.date) || !Number.isInteger(log.total) || log.total < 1 || !Number.isInteger(log.correct) || log.correct < 0 || log.correct > log.total || !Number.isInteger(log.uncertain) || log.uncertain < 0 || log.uncertain > log.total) throw new Error('Invalid practice log in backup.');
    return { ...log, fresh: log.fresh === true, notes: String(log.notes || '') };
  });
  return { records, logs };
}
export function objectiveSummary(tracker, id) {
  const logs = tracker.logs.filter(log => log.objectiveId === id).slice().sort((a,b) => a.date.localeCompare(b.date) || (a.createdAt || 0) - (b.createdAt || 0));
  const fresh = logs.filter(log => log.fresh);
  const total = fresh.reduce((n,log) => n + log.total, 0);
  const correct = fresh.reduce((n,log) => n + log.correct, 0);
  let stage = -1, next = '';
  for (const log of logs) {
    // A later successful retest advances the interval; same-day repetitions do not.
    const success = log.correct === log.total && log.uncertain === 0;
    stage = success ? (stage < 0 ? 0 : log.date >= next ? Math.min(stage + 1,2) : stage) : 0;
    next = plusDays(log.date, [1,3,7][stage]);
  }
  return { logs, total, correct, accuracy: total ? Math.round(correct / total * 100) : null, last: logs.at(-1)?.date || '', due: next, uncertain: logs.reduce((n,log) => n + log.uncertain,0) };
}
export function mergeTrackers(current, incoming) {
  const next = validateTracker(incoming);
  const records = { ...current.records };
  for (const [id,row] of Object.entries(next.records)) if (!records[id] || row.updatedAt > records[id].updatedAt) records[id] = row;
  const seen = new Set(current.logs.map(log => log.id));
  return { records, logs: [...current.logs,...next.logs.filter(log => !seen.has(log.id))] };
}
let selected = null, unitFilter = '', filter = 'all', query = '';
export function renderTracker({ app, el, button, tracker, save, exportBackup, openSets, toast }) {
  const today = dayKey();
  const rowFor = id => tracker.records[id] || {status:'Not started', notes:''};
  const saveRecord = (id, changes) => { tracker.records[id] = {...rowFor(id),...changes,updatedAt:Date.now()}; save(); };
  const select = (values, value, change, label) => el('select', {'aria-label':label,onchange:change}, values.map(([key,text]) => el('option',{value:key,selected:key===value},text)));
  const repaint = () => { app.replaceChildren(); renderTracker({ app, el, button, tracker, save, exportBackup, openSets, toast }); };
  if (selected) {
    const objective = objectives.find(o => o.id === selected);
    const summary = objectiveSummary(tracker, selected);
    app.append(button('Back to tracker', () => {selected=null;repaint();},'secondary small'));
    app.append(el('div',{class:'page-intro'},el('p',{class:'eyebrow'},'UNIT '+objective.unit+' / '+objective.unitName),el('h1',{},objective.id+' '+objective.name),el('p',{class:'lead'},objective.skills)));
    const form = el('form',{class:'panel log-form'});
    const makeField = (label,input) => el('label',{class:'field'},label,input);
    form.append(el('h2',{},'Objective record'),
      makeField('Status (set manually)',select(statuses.map(s=>[s,s]),rowFor(selected).status,e=>saveRecord(selected,{status:e.target.value}),'Status')),
      makeField('Study notes and recurring mistakes',el('textarea',{class:'notes',value:rowFor(selected).notes,placeholder:'What needs work?',onchange:e=>saveRecord(selected,{notes:e.target.value})})),
      el('h2',{},'Log practice'));
    const date = el('input',{type:'date',value:today,required:true,max:today});
    const total = el('input',{type:'number',min:1,max:10000,required:true,placeholder:'e.g. 10'});
    const correct = el('input',{type:'number',min:0,required:true,placeholder:'e.g. 8'});
    const uncertain = el('input',{type:'number',min:0,value:0,required:true});
    const minutes = el('input',{type:'number',min:0,step:'0.1',placeholder:'Optional'});
    const source = select([['Lumanite','Lumanite'],['This site','This site'],['Official sample','Official sample'],['Other','Other']],'Lumanite',()=>{},'Question source');
    const fresh = el('input',{type:'checkbox',checked:true});
    const notes = el('textarea',{class:'notes',placeholder:'Optional: mistake, correction, or source details'});
    form.append(el('div',{class:'field-row'},makeField('Date',date),makeField('Source',source)),
      el('div',{class:'field-row'},makeField('Questions attempted',total),makeField('Correct answers',correct)),
      el('div',{class:'field-row'},makeField('Uncertain or guessed answers',uncertain),makeField('Minutes',minutes)),
      el('label',{class:'checks'},fresh,'Fresh questions (not previously practiced)'),
      makeField('Practice notes',notes),el('p',{class:'notice'},'Log only questions for this objective. Accuracy uses fresh questions. Ready is a manual status, not a predicted test score.'),
      el('div',{class:'error',id:'log-error',role:'alert',hidden:true}),
      el('button',{type:'submit',class:'button'},'Save practice log'));
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const n=Number(total.value), c=Number(correct.value), u=Number(uncertain.value);
      if (!Number.isInteger(n)||n<1||!Number.isInteger(c)||c<0||c>n||!Number.isInteger(u)||u<0||u>n||date.value>today) {
        const error=form.querySelector('#log-error');error.hidden=false;error.textContent='Enter valid counts. Correct and uncertain answers must each be between zero and questions attempted.';return;
      }
      tracker.logs.push({id:crypto.randomUUID(),objectiveId:selected,date:date.value,total:n,correct:c,uncertain:u,minutes:minutes.value?Number(minutes.value):null,source:source.value,fresh:fresh.checked,notes:notes.value.trim(),createdAt:Date.now()});
      if(rowFor(selected).status==='Not started') saveRecord(selected,{status:'Learning'});
      if(save()) toast('Practice log saved.');
      repaint();
    });
    app.append(form,el('h2',{class:'history-heading'},'Practice history'));
    if(!summary.logs.length)app.append(el('p',{class:'notice'},'No practice logged.'));
    summary.logs.slice().reverse().forEach(log=>app.append(el('article',{class:'log-entry'},
      el('div',{class:'section-row'},el('strong',{},log.date+' · '+log.correct+'/'+log.total),el('span',{},log.source+' · '+(log.fresh?'Fresh':'Repeated')+' · '+log.uncertain+' uncertain')),
      log.notes?el('p',{},log.notes):null,
      button('Delete log',()=>{if(!window.confirm('Delete this practice log?'))return;tracker.logs=tracker.logs.filter(l=>l.id!==log.id);save();repaint();},'quiet small'))));
    return;
  }
  const logged=objectives.filter(o=>objectiveSummary(tracker,o.id).logs.length).length;
  const ready=objectives.filter(o=>rowFor(o.id).status==='Ready').length;
  const due=objectives.filter(o=>{const d=objectiveSummary(tracker,o.id).due;return d&&d<=today;}).length;
  app.append(el('div',{class:'page-heading'},el('div',{},el('p',{class:'eyebrow'},'FBLA / DATA SCIENCE & AI'),el('h1',{},'Study tracker')),
    el('div',{class:'actions'},button('Question sets',openSets,'secondary'),button('Export backup',exportBackup,'secondary'))));
  app.append(el('div',{class:'tracker-summary'},
    el('span',{},el('strong',{},logged+' / 44'),' objectives practiced'),
    el('span',{},el('strong',{},ready+' / 44'),' marked ready'),
    el('span',{},el('strong',{},due),' reviews due')));
  const unitSelect=select([['','All units'],...units.map((u,i)=>[String(i+1),(i+1)+'. '+u.name])],unitFilter,e=>{unitFilter=e.target.value;repaint();},'Filter by unit');
  const statusSelect=select([['all','All objectives'],['due','Review due'],['unlogged','No practice logged'],...statuses.map(s=>[s,s])],filter,e=>{filter=e.target.value;repaint();},'Filter by status');
  const search=el('input',{type:'search',value:query,placeholder:'Search objectives', 'aria-label':'Search objectives'});
  search.addEventListener('input',e=>{query=e.target.value;updateRows();});
  app.append(el('div',{class:'tracker-filters'},unitSelect,statusSelect,search));
  const table=el('table',{class:'tracker-table'},el('caption',{class:'sr-only'},'Data Science and AI objectives and study records'));
  const header=el('thead',{},el('tr',{},['Objective','Status','Fresh accuracy','Last practice','Next review',''].map(t=>el('th',{scope:'col'},t))));
  const tbody=el('tbody');
  table.append(header,tbody);
  const container=el('div',{class:'table-scroll',tabindex:0,'aria-label':'Objectives table'},table);
  const empty=el('p',{class:'notice',hidden:true},'No objectives match these filters.');
  app.append(container,empty,el('p',{class:'notice tracker-footnote'},'Status is set manually. Fresh accuracy excludes repeated questions. Reviews are scheduled after 1, 3, and 7 days as successful retests are logged.'),
    el('p',{class:'notice'},el('a',{href:'https://connect.fbla.org/headquarters/files/High%20School%20Competitive%20Events%20Resources/Individual%20Guidelines/Objective%20Tests/Data-Science-and-AI.pdf',target:'_blank',rel:'noopener'},'2026–27 event objectives'),' · Skill descriptions include supporting study topics.'));
  function updateRows() {
    tbody.replaceChildren();let count=0;
    for(const o of objectives){
      const record=rowFor(o.id),s=objectiveSummary(tracker,o.id);
      if(unitFilter&&o.unit!==Number(unitFilter))continue;
      if(query&&!((o.id+' '+o.name+' '+o.skills+' '+o.unitName).toLowerCase().includes(query.toLowerCase())))continue;
      if(filter==='due'&&!(s.due&&s.due<=today)||filter==='unlogged'&&s.logs.length||statuses.includes(filter)&&record.status!==filter)continue;
      count++;
      tbody.append(el('tr',{class:s.due&&s.due<=today?'due-row':''},
        el('th',{scope:'row'},el('span',{class:'objective-name'},o.id+' '+o.name),el('span',{class:'objective-unit'},'Unit '+o.unit+' · '+o.unitName)),
        el('td',{},el('span',{class:'status-text'},record.status)),
        el('td',{},s.accuracy===null?'—':s.accuracy+'% ('+s.correct+'/'+s.total+')'),
        el('td',{},s.last||'—'),el('td',{},s.due?((s.due<=today?'Due: ':'')+s.due):'—'),
        el('td',{},button('Open',()=>{selected=o.id;repaint();window.scrollTo({top:0});},'secondary small',{'aria-label':'Open objective '+o.id}))));
    }
    empty.hidden=count!==0;
  }
  updateRows();
}
