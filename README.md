
# 🧠 NeuroNote

**AI-powered collaborative note-taking tool** that brings teams and individuals together to write, edit, and enhance content in real-time. Powered by **Tiptap**, **Hocuspocus**, and **Gemini API**, NeuroNote offers intelligent summarization, markdown support, and seamless collaboration—all in one place.

---

## 🚀 Features

* 🔐 User authentication (Signup/Login)
* ✍️ Rich-text editor with Tiptap (supports Markdown, embeds, mentions)
* 🔁 Real-time collaboration with conflict resolution via Hocuspocus
* 🧠 AI-powered summarization and suggestions using Gemini API
* 📤 Chat function to communicate with team members
* 💾 Persistent storage with PostgreSQL and Prisma ORM
* 💻 Responsive, clean UI with smooth animations (Framer Motion)

---

## 🧰 Tech Stack

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

* [Gemini API](https://ai.google.dev/gemini-api/docs) (Summarization & suggestions)

---

## 📸 Screenshots

### ✨ Landing Page

![dashboard](https://github.com/user-attachments/assets/your-image-id)

### ✨ Login and Signup pages

![dashboard](https://github.com/user-attachments/assets/your-image-id)


### ✨ Dashboard

![dashboard](https://github.com/user-attachments/assets/your-image-id)

### 📝 Collaborative Editor

![editor](https://github.com/user-attachments/assets/your-image-id)

### 📝 Room Chat function

![editor](https://github.com/user-attachments/assets/your-image-id)

### 💡 AI Summarization

Coming soon ....

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/neuronote
cd neuronote

# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

> Ensure PostgreSQL is running and `.env` is properly configured with your database and API keys.

---

## 📦 Scripts

| Script         | Description                  |
| -------------- | ---------------------------- |
| `pnpm run dev` | Run development server       |
| `pnpm build`   | Build project for production |
| `pnpm lint`    | Lint the codebase            |
| `pnpm format`  | Format code using Prettier   |

---

## 🗂️ Folder Structure

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

* [ ] Dockerize the app
* [ ] Add AI assistant with summarization
* [ ] Deploy full-stack app
* [ ] Add note version history

---

## 📬 Feedback or Collaboration

Interested in contributing or sharing feedback? Feel free to connect:

* 📫 Email: `yadavabhijay@gmail.com`
* 🌐 [Portfolio](#)
* 💼 [LinkedIn]()

---
