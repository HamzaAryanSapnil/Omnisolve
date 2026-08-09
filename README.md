<div align="center">

# Omnisolve: Community-Driven Developer Q&A Platform

[![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/-NextAuth-000000?style=for-the-badge&logo=auth0&logoColor=white)](https://authjs.dev/)
[![OpenAI](https://img.shields.io/badge/-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_GITHUB_USERNAME/omnisolve?style=for-the-badge)](https://github.com/YOUR_GITHUB_USERNAME/omnisolve/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_GITHUB_USERNAME/omnisolve?style=for-the-badge)](https://github.com/YOUR_GITHUB_USERNAME/omnisolve/network/members)

<br />

<img src="https://github.com/user-attachments/assets/769882e6-bae6-4932-a117-829cf34f809f" alt="Omnisolve project banner" width="100%" />

</div>

## Table of Contents

1. [Demo](#-demo)
2. [Description](#-description)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [Getting Started](#-getting-started)
6. [Environment Variables](#-environment-variables)
7. [Usage](#-usage)
8. [How to Contribute](#-how-to-contribute)
9. [Bug Reporting](#-bug-reporting)
10. [Todos / Future Improvements](#-todos--future-improvements)
11. [Credits](#-credits)
12. [References](#-references)
13. [Contact](#-contact)
14. [License](#-license)

---

## Demo

Here is a working live demo: [https://your-omnisolve-demo.vercel.app](https://your-omnisolve-demo.vercel.app)

For local development, run the app and open [http://localhost:3000](http://localhost:3000).

---

## Description

**Omnisolve** is a community-driven Q&A platform for developers — inspired by Stack Overflow — where you can ask programming questions, share detailed answers, vote on quality content, and grow reputation through badges.

It goes further with **AI-assisted answers**, personalized **recommendations**, **saved collections**, **global search**, and a **developer jobs** board. The goal is to help learners and professionals find clear solutions faster and stay connected with the developer community.

This project is based on the Devoverflow / DevFlow application from [JavaScript Mastery’s Ultimate Next.js Course](https://www.jsmastery.pro/ultimate-next-course), rebranded and documented here as **Omnisolve** for portfolio use.

---

## Features

- **Authentication** — Sign up / sign in with email & password, Google, or GitHub (NextAuth / Auth.js v5)
- **Ask & answer** — Create, edit, and delete questions and answers with a rich MDX editor (code blocks, images, links, tables)
- **Voting** — Upvote / downvote questions and answers; reputation updates accordingly
- **View counter** — Track how many times a question has been viewed
- **Tags** — Browse tags, open tag detail pages, and see popular tags in the sidebar
- **Collections** — Bookmark questions and manage saved items with search and filters
- **Community** — Discover users sorted by newest, oldest, or reputation
- **Profiles** — Public profiles with bio, location, portfolio, stats, badges, and post history
- **Reputation & badges** — Gold, silver, and bronze badges based on engagement criteria
- **Recommendations** — Personalized home feed based on interactions and tags
- **Local & global search** — Search within pages or across questions, answers, users, and tags
- **AI answer generation** — Generate markdown answers with OpenAI (GPT-4 Turbo) via the Vercel AI SDK
- **Jobs board** — Browse developer jobs via RapidAPI JSearch with country / location filters
- **Theming** — Light, dark, and system themes with a responsive three-column layout

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Auth | NextAuth (Auth.js) v5, bcryptjs |
| Database | MongoDB, Mongoose |
| UI | Tailwind CSS, ShadCN UI, Radix UI, Lucide |
| Forms | React Hook Form, Zod |
| Content | MDXEditor, next-mdx-remote, Bright |
| AI | Vercel AI SDK (`ai`), `@ai-sdk/openai` |
| Jobs | RapidAPI JSearch |
| Tooling | ESLint, Prettier, Pino (logging) |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS recommended) and npm
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)

You will also need API credentials for:

- Google OAuth and GitHub OAuth apps
- [OpenAI](https://platform.openai.com/) (AI answers)
- [RapidAPI](https://rapidapi.com/) JSearch (jobs)

### Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/omnisolve.git
cd omnisolve
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root (see [Environment Variables](#-environment-variables) below). Do **not** commit this file or share real secrets.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Environment Variables

Create `.env.local` with the variables below. Only variables used by this codebase are listed.

```env
# Database (required)
MONGODB_URI=

# OpenAI — AI answer generation (required for AI feature)
OPENAI_API_KEY=

# RapidAPI JSearch — jobs board
NEXT_PUBLIC_RAPID_API_KEY=

# Auth.js / NextAuth (required for auth)
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
# Auth.js also accepts AUTH_URL as an alternative to NEXTAUTH_URL

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Optional
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
LOG_LEVEL=info
```

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `OPENAI_API_KEY` | OpenAI API key for `/api/ai/answers` |
| `NEXT_PUBLIC_RAPID_API_KEY` | RapidAPI key for the jobs page |
| `AUTH_SECRET` | NextAuth / Auth.js secret |
| `NEXTAUTH_URL` | App base URL for auth callbacks |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth credentials |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth credentials |
| `NEXT_PUBLIC_API_BASE_URL` | Internal API base (defaults to `http://localhost:3000/api`) |
| `LOG_LEVEL` | Pino log level (defaults to `info`) |

---

## Usage

1. **Sign up or sign in** — Use email/password or continue with Google / GitHub.
2. **Ask a question** — Open **Ask a Question**, write with the MDX editor, add tags, and publish.
3. **Answer & assist** — Reply on a question page, or use **Generate AI Answer** for a draft.
4. **Vote & save** — Upvote useful content and bookmark questions into your collection.
5. **Explore** — Browse **Tags**, **Community**, profiles, and the **Jobs** board.
6. **Search** — Use the navbar global search or page-level local search to find content quickly.

---

## How to Contribute

Contributions are welcome. A typical workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to your fork (`git push origin feature/amazing-feature`)
5. Open a Pull Request with a clear description of what changed and why

Please keep PRs focused, follow existing code style, and avoid committing secrets or `.env` files.

---

## Bug Reporting

If you find a bug:

1. Go to the repository **Issues** tab
2. Click **New Issue**
3. Include a clear title, steps to reproduce, expected vs actual behavior, and screenshots if helpful

---

## Todos / Future Improvements

- [ ] Full UI rebrand from DevFlow naming to Omnisolve across the app
- [ ] Deploy live demo and replace the placeholder demo URL
- [ ] In-app notifications for answers, votes, and mentions
- [ ] Admin / moderation tools
- [ ] Richer job filters and saved job listings
- [ ] Add a custom Omnisolve README thumbnail / brand assets

---

## Credits

Built with guidance and structure from:

- **[JavaScript Mastery](https://www.jsmastery.pro/)** — [Ultimate Next.js Course](https://www.jsmastery.pro/ultimate-next-course) (Devoverflow / DevFlow)

Third-party technologies and services used in this project:

- [Next.js](https://nextjs.org/)
- [NextAuth / Auth.js](https://authjs.dev/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- [OpenAI](https://openai.com/) & [Vercel AI SDK](https://sdk.vercel.ai/)
- [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- [RapidAPI JSearch](https://rapidapi.com/)
- [MDXEditor](https://mdxeditor.dev/)

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

## Contact

If you have questions or feedback, feel free to reach out:

- [Follow on X / Twitter](https://twitter.com/your-twitter-handle)
- [Connect on LinkedIn](https://www.linkedin.com/in/your-linkedin-profile)
- [Email](mailto:your-email@example.com)
- [GitHub](https://github.com/YOUR_GITHUB_USERNAME)

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

- [MIT License info](https://opensource.org/licenses/MIT)
