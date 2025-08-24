# NeuroNote

**AI-powered collaborative note-taking tool** that brings teams and individuals together to write, edit, and enhance content in real-time. Powered by **Tiptap**, **Hocuspocus**, and **Gemini API**, NeuroNote offers intelligent summarization, grammar checks, and seamless collaboration—all in one place.

---

## Features

* User authentication (Signup/Login)
* Rich-text editor with Tiptap (bold, italic, headings, lists, etc.)
* Real-time collaboration with conflict resolution via Hocuspocus
* AI-powered summarization and grammar checks using Gemini API
* Chat function to communicate with team members
* Persistent storage with PostgreSQL and Prisma ORM
* **Secret code-based room joining**:
  - A **secret code** is generated when a room is created
  - Users **must enter this code** to join a room for the first time
  - Once joined, the room will be listed in their dashboard and can be rejoined **without needing the code again**
* **AI Sidebar for collaborative documents**:
  - Instantly summarize or grammar-check the live document content
  - Trigger AI actions with one click, without leaving the editor
* Responsive, clean UI with smooth animations

---

## Tech Stack

### Frontend

* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [Tiptap Editor](https://tiptap.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)

### Backend

* [Node.js](https://nodejs.org/)
* [Hocuspocus](https://hocuspocus.dev/) (WebSocket collaboration backend)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma ORM](https://www.prisma.io/)

### AI Integration

* [Gemini API](https://ai.google.dev/gemini-api/docs) (Summarization & grammar-check)

---

## Screenshots

<details>
<summary>Landing Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/31e7e001-60b3-40b0-8967-883f95f9ccd4" width="600" />

</p>
</details>

<details>
<summary>Login and Signup Pages</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/0dc3d76f-6e38-4269-924a-eadc54dcec40" width="300" />
  <img src="https://github.com/user-attachments/assets/524e5e20-207f-4526-8086-40fe2b981d55" width="300" />

</p>
</details>

<details>
<summary>Dashboard</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4a66b8ec-e68a-4ac0-ba44-5db25ed7b805" width="600" />

</p>
</details>

<details>
<summary>Collaborative Editor</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4602607d-f072-451f-b311-bc134799b2e8" width="600" />

</p>
</details>

<details>
<summary>Room Chat</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ea0a3a73-f188-4e95-9bb2-40d0323f7e4c" width="600" />
</p>
</details>

<details>
<summary>AI Summarization & Grammar-check</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/57b2d3e8-c082-481f-94fc-8a1b46d85a21" width="600" />

</p>
</details>



---

## Getting Started

### Manual Setup

```bash
Prerequisites
Node.js (v18+ recommended)
pnpm (Install via npm i -g pnpm)
PostgreSQL (Locally running, or use cloud-hosted)
Git

Steps
# Clone the repository
git clone https://github.com/your-username/neuronote
cd neuronote

# Install dependencies
pnpm install

# Create environment variables
Change .env.example to .env file and add same JWT_SECRET in every folder
# Also, add your Gemini API key to /apps/server/.env
# Change the Database url in /packages/db folder to a proper postgres db url

# Generate prisma client
cd packages/db
npx prisma generate

# Run development servers
pnpm run dev

# Access the App
Frontend: http://localhost:3000
Backend API: http://localhost:3001
WebSocket: ws://localhost:5000
Hocuspocus: ws://localhost:1234

```

### Docker setup 
```
1. Prerequisites
Install Docker

## Clone the repo:
git clone https://github.com/your-username/neuronote
cd neuronote

2. Configure Environment Variables
Rename .env.example to .env in all the directories and add same JWT_SECRET

# Add your Gemini API Key to /apps/server/.env:
GEMINI_API_KEY=your_gemini_api_key

3. Run All Services
# Use the following command to build and start everything:

docker-compose up --build
This will start:

web: Next.js frontend
server: REST backend (auth, notes, AI)
ws-server: WebSocket chat backend
hocuspocus-server: Real-time Tiptap collaboration server
postgres: PostgreSQL database

4. Access the App
# Once Docker Compose finishes:

Frontend: http://localhost:3000
Backend API: http://localhost:3001
WebSocket: ws://localhost:5000
Hocuspocus: ws://localhost:1234

```

> Ensure PostgreSQL is running and `.env` is properly configured with your database and API keys.

---

## Scripts

| Script         | Description                  |
| -------------- | ---------------------------- |
| `pnpm run dev` | Run development server       |
| `pnpm build`   | Build project for production |
| `pnpm lint`    | Lint the codebase            |
| `pnpm format`  | Format code using Prettier   |

---

## Folder Structure

```
apps/
  ├── web/                    # Next.js fronted with landing page,login,signup,dashboard with Room function which uses Tiptap
  ├── hocuspocus-server/      # Real-time collaboration backend for Tiptap
  ├── server/                 # REST endpoints for auth, notes, etc.
  ├── ws-server/              # Real-time websocket backend for Chat and Room
packages/
  ├── ui/                     # Shared UI components (Buttons, Modals)
  ├── db/                     # Database schema and Prisma client
  ├── common/                 # Helper functions and types
  ├── backend-common/         # Common data for backend
  ├── eslint-config/
  ├── typescript-config/
```

---

## ✅ TODOs

* [X] Add AI assistant with summarization and grammar-check
* [X] Dockerize the app
* [X] Deploy full-stack app
* [ ] Add note version history

---

## Feedback or Collaboration

Interested in contributing or sharing feedback? Feel free to connect:

* Email: yadavabhjay@gmail.com
* [Portfolio](https://portfolio1-two-xi.vercel.app/)
* [LinkedIn](https://linkedin.com/in/abj-ydv)

---
