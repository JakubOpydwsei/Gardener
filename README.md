# Gardener

Web application for garden management and plant planning.

---

## About

Gardener helps users browse a plant encyclopedia, create custom gardens, and plan their plantings. The app features a searchable plant database with detailed information about growing requirements and seasonal care.

**Project type:** Engineering project (team of 3 contributors)  
**Status:** MVP - Work in progress

---

## Features

### Plant Encyclopedia
- Browse plant database with search and filtering
- View detailed plant information (description, requirements, growing season)
- Add plants to your garden

### Garden Planner
- Create and manage multiple gardens
- Assign plants to gardens
- Edit and remove plants
- Visual plant list for each garden

---

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **DaisyUI** - Component library
- **Fetch API** - HTTP requests
- **Tailwind CSS** - CSS framework
- **AOS** - Animation library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database

### Authentication
- Session-based authentication with tokens

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JakubOpydwsei/Gardener.git
cd Gardener
```

2. **Install dependencies**

Frontend:
```bash
npm install
```

Backend:
```bash
cd backend
npm install
```

Or install all:
```bash
npm run install:all
```

3. **Set up environment variables**

Create `.env` file in the `/backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

4. **Run the application**

Start backend:
```bash
cd backend
npm start
```

Start frontend (in a separate terminal):
```bash
npm run dev
```

Or run all:
```bash
npm run dev:all
```

The app will be available at `http://localhost:5173`

---

## Planned Features

- [ ] AI-powered plant recommendations
- [ ] Push notifications for plant care reminders
- [ ] Progressive Web App (PWA) support
