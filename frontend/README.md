# My Portfolio

A full-stack personal portfolio website for **Rohitha Channamallu**, a frontend developer and web development enthusiast. The site showcases skills, projects, certifications, education, and includes a contact form backed by a Node.js API.

## Features

- **Responsive single-page layout** with sticky navigation and smooth scrolling
- **Hero section** with profile image, role summary, social links, and CV download
- **About** — personal, professional, and interest details
- **Skills** — grouped by frontend, backend, programming languages, and tools
- **Projects** — card grid with tech badges, GitHub links, and live demo links
- **Certifications** — scrolling marquee for technical and non-technical credentials
- **Education** — academic background
- **Contact form** — submits messages to the backend; entries are saved to MongoDB and forwarded via email

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Create React App](https://create-react-app.dev/) | Build tooling |
| [Axios](https://axios-http.com/) | HTTP client for contact form |
| [Lucide React](https://lucide.dev/) | Skill section icons |
| [React Icons](https://react-icons.github.io/react-icons/) | Social and UI icons |
| CSS | Component-scoped styling (dark theme) |

### Backend
| Technology | Purpose |
|---|---|
| [Express 5](https://expressjs.com/) | REST API server |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Data persistence |
| [Nodemailer](https://nodemailer.com/) | Email notifications for contact messages |
| [CORS](https://github.com/expressjs/cors) | Cross-origin requests from the React dev server |

## Project Structure

```
my-portfolio/
├── public/                 # Static assets served by CRA
├── src/
│   ├── components/
│   │   ├── about.js        # About Me section
│   │   ├── Skills.js       # Skills grid
│   │   ├── project.js      # Projects showcase
│   │   ├── Certifications.js
│   │   └── contact.js      # Contact form (calls backend API)
│   ├── Images/             # Profile and local images
│   ├── App.js              # Main layout, navbar, and section routing
│   └── index.js            # React entry point
└── backend/
    ├── models/
    │   ├── About.js        # About schema
    │   ├── Project.js      # Project schema
    │   └── Contact.js      # Contact message schema
    ├── server.js           # Express server and API routes
    ├── .env.example        # Environment variable template
    └── .env                # Local secrets (not committed)
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a MongoDB Atlas connection string
- A Gmail account (or other SMTP provider) if you want contact emails to work

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd my-portfolio
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install and configure the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file by copying `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
RECEIVER_EMAIL=person-you-want@example.com
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) rather than your regular account password.

> **Who gets contact emails?** Set `RECEIVER_EMAIL` to any inbox you choose — your personal email, work email, or someone else's. Restart the backend after changing it.

Ensure MongoDB is running locally, or set `MONGODB_URI` to your MongoDB Atlas connection string.

### 4. Run the application

Start the backend (from the `backend/` directory):

```bash
npm start
```

The API will be available at `http://localhost:5000`.

In a separate terminal, start the frontend (from the project root):

```bash
npm start
```

The site opens at [http://localhost:3000](http://localhost:3000). The CRA dev server proxies API requests to port 5000 via the `proxy` setting in `package.json`.

For production builds, set `REACT_APP_API_URL` to your deployed backend URL (e.g. `https://api.example.com`) so the contact form reaches the API.

## Available Scripts

### Frontend (project root)

| Command | Description |
|---|---|
| `npm start` | Run the development server on port 3000 |
| `npm run build` | Create an optimized production build in `build/` |
| `npm test` | Run tests in watch mode |
| `npm run eject` | Eject from Create React App (irreversible) |

### Backend (`backend/`)

| Command | Description |
|---|---|
| `npm start` | Start the Express API server |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/about` | Fetch about data from MongoDB |
| `GET` | `/projects` | List all projects from MongoDB |
| `POST` | `/projects` | Create a new project |
| `POST` | `/contact` | Save a contact message and send an email notification |
| `GET` | `/projects-test` | Return sample project data (for testing) |

**Contact request body:**

```json
{
  "email": "visitor@example.com",
  "message": "Hello!"
}
```

## Customization

Content is mostly defined directly in the React components:

- **Hero, navbar, education, social links** — `src/App.js`
- **About details** — `src/components/about.js`
- **Skills** — `src/components/Skills.js`
- **Projects** — `src/components/project.js`
- **Certifications** — `src/components/Certifications.js`

Place project images in `public/` (e.g. `projext1.png`, `Project2.png`) and update paths in `project.js`. Add your resume as `public/resume.pdf` for the download button to work.

The backend `/about` and `/projects` routes are available for dynamic content, but the frontend currently uses static data for those sections.

## Design

The UI uses a dark theme (`#0d0d1a` background) with blue (`#60a5fa`) and pink (`#f472b6`) accent colors, the Poppins font, and a sticky top navigation bar.

## Deployment (Vercel + Render)

This project has two parts:

| Part | Host | Folder |
|------|------|--------|
| React frontend | [Vercel](https://vercel.com) | project root |
| Express API | [Render](https://render.com) | `backend/` |

You also need [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free) for the database in production.

### Step 1 — MongoDB Atlas

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Database Access → create a user and password
3. Network Access → add `0.0.0.0/0` (allow from anywhere)
4. Connect → get connection string, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

### Step 2 — Deploy backend on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New +** → **Web Service**
3. Connect your repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Add **Environment Variables:**

| Key | Value |
|-----|--------|
| `MONGODB_URI` | Your Atlas connection string |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail 16-char app password |
| `RECEIVER_EMAIL` | Inbox for contact messages |
| `FRONTEND_URL` | Your Vercel URL (add after Step 3) |

6. Deploy and copy your backend URL, e.g. `https://portfolio-backend-xxxx.onrender.com`

Test: open that URL — you should see `Express server is running!`

### Step 3 — Deploy frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repo
3. Settings:
   - **Framework Preset:** Create React App
   - **Root Directory:** `.` (leave as project root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Add **Environment Variable:**

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | `https://portfolio-backend-xxxx.onrender.com` |

5. Deploy

Copy your Vercel URL (e.g. `https://my-portfolio.vercel.app`), then go back to Render and set `FRONTEND_URL` to that URL. Redeploy the backend if needed.

### Step 4 — Test live site

1. Open your Vercel URL
2. Submit the contact form
3. Check MongoDB Atlas and your email inbox

### Notes

- **Render free tier** sleeps after ~15 min idle — first request may take 30–60 seconds to wake up
- **Never commit** `.env` files — use platform environment variables only
- Optional: use `render.yaml` in this repo for Blueprint deploy on Render

## License

This project is private (`"private": true` in `package.json`).
