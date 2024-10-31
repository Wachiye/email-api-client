# Email Client

## Overview

This is a simple email client that allows users to send, receive, and view emails with real-time updates.

## Features

- **Inbox**: Displays a list of received emails
- **Sent**: Displays a list of sent emails.
- **Email View**: Displays full details an email.
- **Compose**: Users can compose and send new emails.
- **Real-Time Updates**: Implements Socket.IO to automatically refresh the inbox when new emails arrive.
- **Pagination and Navigation**: 
  - Default page size set to 10 emails.
  - Navigation options for pagination (Next, Previous). Default page size is 10
- **Search Functionality**: Filter emails by sender or subject.

## Tech Stack

- **Front-end**: React, TypeScript,Bootstrap
- **Back-end**: Node.js, Express, MongoDB
- **Real-Time Communication**: Socket.IO
- **Deployment**: Vercel (back-end & front-end)

## Installation (CLIENT)
1. Clone the `CLIENT` repo
2. ADD `VITE_API_BASE_URL` TO `.env` file with URL of API
3. RUN `npm install` in client dir
4. RUN `npm run dev` fro dev or RUN `npm run build` then `npm start` from prod


## Installation (API)
1. Clone the `api` repo
2. Create and update the api .env file based on the api `.env-example`
3. RUN `npm install` in client dir
4. RUN `npm run dev` fro dev or RUN `npm run build` then `npm start` from prod
