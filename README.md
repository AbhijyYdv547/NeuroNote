# 🧠 NeuroNote

**AI-powered collaborative note-taking tool** that brings teams and individuals together to write, edit, and enhance content in real-time. Powered by **Tiptap**, **Hocuspocus**, and **Gemini API**, NeuroNote offers intelligent summarization, grammar checks, and seamless collaboration—all in one place.

---

## 🚀 Features

* 🔐 User authentication (Signup/Login)
* ✍️ Rich-text editor with Tiptap (bold, italic, headings, lists, etc.)
* 🔁 Real-time collaboration with conflict resolution via Hocuspocus
* 🧠 AI-powered summarization and grammar checks using Gemini API
* 📤 Chat function to communicate with team members
* 💾 Persistent storage with PostgreSQL and Prisma ORM
* 🏷️ **Secret code-based room joining**:
  - A **secret code** is generated when a room is created
  - Users **must enter this code** to join a room for the first time
  - Once joined, the room will be listed in their dashboard and can be rejoined **without needing the code again**
* 📚 **AI Sidebar for collaborative documents**:
  - Instantly summarize or grammar-check the live document content
  - Trigger AI actions with one click, without leaving the editor
* 💻 Responsive, clean UI with smooth animations

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

* [Gemini API](https://ai.google.dev/gemini-api/docs) (Summarization & grammar-check)

---

## 📸 Screenshots

<details>
<summary>✨ Landing Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/421bb724-3da5-44ab-a34c-9657ab590c85" width="600"/>
</p>
</details>

<details>
<summary>🔐 Login and Signup Pages</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/e1f734b4-471e-4a19-84a5-c841fb9a7f3c" width="300"/>
  <img src="https://github.com/user-attachments/assets/167305d2-b97a-4bdd-8339-339d175d1785" width="300"/>
</p>
</details>

<details>
<summary>📊 Dashboard</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/8c9b61dc-89ba-4413-b7ab-43d4054b26f4" width="600"/>
</p>
</details>

<details>
<summary>📝 Collaborative Editor</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ded6da2d-caa4-40e7-b0cf-36d7c8fe6223" width="600"/>
</p>
</details>

<details>
<summary>💬 Room Chat</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/e7432b14-85de-4dcf-be77-604e4fddc16f" width="600"/>
</p>
</details>

<details>
<summary>🤖 AI Summarization & Grammar-check</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/467e3fdf-2700-4006-a110-94a91b394684" width="600"/>
</p>
</details>



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

* [X] Add AI assistant with summarization and grammar-check
* [ ] Dockerize the app
* [ ] Deploy full-stack app
* [ ] Add note version history

---

## 📬 Feedback or Collaboration

Interested in contributing or sharing feedback? Feel free to connect:

* 📫 Email: yadavabhjay@gmail.com
* 🌐 [Portfolio](#)
* 💼 [LinkedIn](https://linkedin.com/in/abj-ydv)

---
