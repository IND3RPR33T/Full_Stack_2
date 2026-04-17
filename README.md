# NexusChat — Real-time WebSocket Chat Application

![Full Stack CI/CD](https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/ci-cd.yml/badge.svg)
![Backend CI](https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CI](https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/actions/workflows/frontend-ci.yml/badge.svg)

> Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPO_NAME>` with your actual GitHub details after pushing.

A full-stack, real-time two-way chat application with **text and voice messaging**, built with:
- **Backend**: Spring Boot 3 + STOMP over WebSocket + SockJS
- **Frontend**: React 18 + Vite + @stomp/stompjs

## Features
- ⚡ Real-time two-way text messaging
- 🎙 Voice message recording and playback
- 👥 Live online users sidebar
- 🌐 Discord/Slack-style desktop UI

## Quick Start

### Backend
```bash
cd Websocketdev
.\mvnw.cmd spring-boot:run      # Windows
./mvnw spring-boot:run           # Linux/Mac
```
Runs on: `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on: `http://localhost:5173`

## CI/CD (GitHub Actions)

Three workflows run automatically on every push to `main`:

| Workflow | Trigger | What it does |
|---|---|---|
| `ci-cd.yml` | All pushes | Runs backend + frontend in parallel, reports overall status |
| `backend-ci.yml` | Changes in `Websocketdev/` | Builds JAR, runs tests, uploads artifact |
| `frontend-ci.yml` | Changes in `frontend/` | Runs `npm ci`, builds production bundle, uploads dist |

See full documentation in [documentation.md](documentation.md).
