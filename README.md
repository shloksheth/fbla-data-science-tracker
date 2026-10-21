# FBLA Data Science & AI Tracker

A static tracker for the event's 44 published objectives, with question-set import, practice, timed tests, review history, backups, and light/dark mode.

The Schedule tab contains October 21–November 17, 2026, with at most three tasks per day, specific readings, premade Quizlet card ranges, question counts and topic allocations. Regular days allow 45–60 minutes; light days allow 25–35. Some topic sets continue across dates. Question requests can be copied into chat and the resulting JSON imported in Question sets; sets are not generated automatically. Time allowances include corrections but remain estimates.

It opens on the browser's local date; arrows browse the plan. The selected day's objectives are highlighted in the tracker. Adaptive review days let you choose the objective from your actual results. Schedule progress is included in exported backups. Revised assignments start unchecked rather than treating earlier, smaller assignments as completed. Previous records remain in backups, and notes and practice history stay. Completing a task does not change objective readiness.

Quizlet card ranges refer to the listed public decks in their original order with shuffle off. The main FBLA deck's network cards 58–61 are excluded; network definitions instead use the linked textbook. Public decks can change. No Quizlet content is copied into this repository.

Run checks with `node --test tests/*.test.mjs`.

## Run locally

Run python -m http.server 4173 in this directory, then visit http://localhost:4173.

## Hosting

GitHub Pages publishes the main branch from the repository root. No build step is required.

## Your data

Sets, objective records, results, and theme preferences are saved in browser storage. Export a backup before switching browsers or site addresses, then import it on the new site. No personal study records or credentials are included in this repository.

Practice questions are preparation material, not official FBLA exam items.
