# Magical LLM Challenge

## Overview

Welcome! We're excited to see you're interested in joining our team.

Today, you'll be working on a scoped down version of our autonomous automation platform.

Below you will find all the necessary information to complete the task. If you have any questions, please reach out to your contact at Magical.

### Task

You are tasked with creating an AI agent that fills out web forms, create a working agentic loop
that will fill out an example healthcare workflow.

Here is the SOP (standard operating procedure) for the workflow:
1. Navigate to https://magical-medical-form.netlify.app/
2. Fill out the form with:
   1. First Name: John
   2. Last Name: Doe
   3. Date of birth: 1990-01-01
   4. Medical ID: 91927885
3. Click 'Submit'

### Bonus Points

In this challenge there are a few bonus points, that'll help supercharge the agent.

1. Complete the 2nd and 3rd sections of the form. You will need to:
   1. Fill out dropdowns
   2. Scroll to, and open the appropriate sections
2. Add the ability to run the workflow via an API call
3. Add the ability to pass in variables for the prompt
   1. Think a dynamic "First Name" and "Last Name," you can hardcode an example
4. Make it so that this workflow can be run automatically on a schedule, every 5 minutes in this
   case.
5. Think of something else our agent needs and implement it!

### What's provided

We've provided you with a basic setup that will set you up for success. You're given:

1. An initiated playwright session
2. A model setup, with access to the Vercel AI SDK (what we use)
   1. NOTE: You will need to provide your own Gemini API key via the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable.
   2. You can get a free API key from the [Google AI Studio](https://aistudio.google.com/apikey).

## Setup

### System Requirements

- Node.js 20+


### Setup

Clone the repository

Install dependencies
```bash
npm install
```

Install playwright
```bash
npx playwright install
```

Create a `.env` file and add your Gemini API key

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
```

### Running the script

```bash
npm run dev
```



### How to run

### Basic run
npm run dev

### API server (with scheduler)
npm run server

### Trigger via API
curl -X POST http://localhost:3000/run \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane", "lastName": "Smith", "dateOfBirth": "1990-01-01", "medicalId": "91927885"}'

Note: You will need to create a .env file with your own GOOGLE_GENERATIVE_AI_API_KEY. For best results, enable billing on your Google Cloud project to avoid free tier rate limits.

## What I built
Agentic loop using Vercel AI SDK and Gemini that fills all 3 form sections including dropdowns. REST API to trigger runs with dynamic patient variables, an auto-scheduler that runs every 5 minutes, and secure API key management via .env.

## Technical Decisions

**Model Selection**
The starter code referenced gemini-2.5-flash-preview-04-17 but that model was no longer available via the API. After some trial and error with different model names, I landed on gemini-2.5-flash which worked reliably.

**Agentic Approach**
I started by building a fully agentic loop where Gemini would decide every action, which was cool to watch but got unpredictable with dropdowns. The AI would get stuck in loops trying to click things in different ways. I ended up going with a hybrid approach where the AI handles orchestration and decision making, but the actual form interactions use direct Playwright commands. This made the dropdown handling way more reliable and the whole thing more predictable end to end.

**Rate Limiting**
Hit the Gemini free tier limits pretty hard during development, 5 requests per minute and 20 per day. For anyone running this, I'd recommend enabling billing on your Google Cloud project. It's cheap and removes the headache entirely.