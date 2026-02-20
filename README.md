# Autonomous Form Agent

## Overview
An AI agent that autonomously fills out multi-section web forms using Google Gemini and Playwright. Built as a hybrid agentic system where the AI handles orchestration while Playwright handles reliable browser interactions.

## Features
- Fills all 3 form sections including custom dropdowns
- REST API to trigger runs with dynamic patient variables
- Auto-scheduler that runs every 5 minutes
- Secure API key management via .env

- "Note: This runs locally as it requires browser automation. No deployment needed."

## Setup

### System Requirements
- Node.js 20+

### Install dependencies
```bash
npm install
```

### Install Playwright
```bash
npx playwright install
```

### Create a .env file
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
```

## How to run

### Basic run
```bash
npm run dev
```

### API server (with scheduler)
```bash
npm run server
```

### Trigger via API
```bash
curl -X POST http://localhost:3000/run \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane", "lastName": "Smith", "dateOfBirth": "1990-01-01", "medicalId": "91927885"}'
```

## Technical Decisions

**Model Selection**
The starter code referenced gemini-2.5-flash-preview-04-17 but that model was no longer available via the API. After some trial and error with different model names, I landed on gemini-2.5-flash which worked reliably.

**Agentic Approach**
I started by building a fully agentic loop where Gemini would decide every action, which was cool to watch but got unpredictable with dropdowns. The AI would get stuck in loops trying to click things in different ways. I ended up going with a hybrid approach where the AI handles orchestration and decision making, but the actual form interactions use direct Playwright commands. This made the dropdown handling way more reliable and the whole thing more predictable end to end.

**Rate Limiting**
Hit the Gemini free tier limits pretty hard during development, 5 requests per minute and 20 per day. For anyone running this, I'd recommend enabling billing on your Google Cloud project. It's cheap and removes the headache entirely.
