# Terminal Portfolio

A modern, monochrome terminal-style developer portfolio built with React, TypeScript, and Tailwind CSS.

## Features

- **Terminal Aesthetic**: Simplistic black and white design with monospace fonts and retro scanline effects.
- **Interactive Terminal Simulator v3.0**:
  - Full Virtual File System (VFS) with permissions, sizes, and dates.
  - **Advanced Commands**:
    - `ls -la`: Long listing with permissions and hidden files.
    - `tree`: Visual recursive directory structure.
    - `htop`: Interactive process viewer with dynamic ASCII charts.
    - `ping`: Simulated network sequence.
    - `man`: Manual pages for all custom commands.
  - **Shell Features**: `Up/Down` history, `Tab` autocompletion, and 100-line scroll buffer.
  - **Matrix Mode**: Interactive easter egg via `matrix` command.
- **Responsive Layout**: Works on mobile and desktop while maintaining the terminal feel.
- **Projects Showcase**: List of projects with tags and links.
- **Minimalist Blog**: Clean reading experience for articles.
- **Type-Safe**: Built with TypeScript for better developer experience.

## Tech Stack

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **Biome** (Linting & Formatting)
- **Vitest** (Testing)
- **Express** (Backend API)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development environment:**
   ```bash
   # Starts both frontend and backend API
   npm run dev
   ```

3. **Check for errors and format:**
   ```bash
   npm run biom     # Run linter and formatter checks
   npm run lint:fix # Apply automatic fixes
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

## Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launch client (Vite) and server (Node --watch) concurrently |
| `npm run build` | Build the application for production |
| `npm run biom` | Check linting and formatting with Biome |
| `npm run format` | Auto-format code with Biome |
| `npm run type-check` | Run TypeScript compiler in no-emit mode |
| `npm run test` | Run unit tests with Vitest |
| `npm run preview` | Preview the production build locally |

## Admin Dashboard

The portfolio includes a built-in admin dashboard to manage projects and blog posts.

- **URL:** `/admin`
- **Password:** `admin` (Default, change in `server/index.js`)

## Structure

- `src/components`: Reusable UI components like `TerminalPrompt` and `Layout`.
- `src/pages`: Main application views (Home, Projects, Blog).
- `src/data`: Static data for projects and blog posts.
- `src/index.css`: Global styles and Tailwind directives.
- `server/`: Express backend for handling translations and data persistence.
