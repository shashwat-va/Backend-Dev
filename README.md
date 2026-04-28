# Assignment 2 - Node.js Exercises

## Overview

This project includes five Node.js exercises:

1. File operations: read a text file, count words, write result to a new file.
2. Custom module: string utilities for capitalizing, reversing, and counting vowels.
3. System information logger: log OS data every 5 seconds.
4. Simple TODO API: in-memory REST API for tasks.
5. Event loop demo: show execution order of timers, immediate, nextTick, and promise callbacks.

## Files

- `exercise1.js` - reads `input.txt`, counts words, writes `wordcount.txt`
- `stringUtils.js` - exports `capitalize`, `reverse`, and `countVowels`
- `systemLogger.js` - appends system info to `system.log` every 5 seconds
- `todoApi.js` - Express API server for task CRUD operations
- `eventLoopDemo.js` - demonstrates Node.js event loop callback order
- `input.txt` - sample input for the word count program

## Setup

Install dependencies:

```bash
npm install
```

## Run

- Word count: `npm run wordcount`
- System logger: `npm run system-logger`
- TODO API: `npm run todo-api`
- Event loop demo: `npm run event-loop`

## TODO API Endpoints

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks` with `{ "title": "Task name" }`
- `PUT /tasks/:id` with `{ "title": "Updated" , "completed": true }`
- `DELETE /tasks/:id`
