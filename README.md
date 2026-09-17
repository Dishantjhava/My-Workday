# 🌟 My Workday — Daily Clarity, Focus & Team Alignment

> A modern, human-centered workday dashboard designed to eliminate daily ambiguity, bridge the communication gap between employees and managers, and bring joy and structure to everyday execution.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-HTML%2FCSS%2FJS-facc15.svg)
![Responsive](https://img.shields.io/badge/responsive-mobile%20%7C%20tablet%20%7C%20desktop-emerald.svg)

---

## 🎯 The Problem We Solve

In modern workplaces, team members and managers often encounter recurring friction:
1. **Unclear Priorities & Ambiguity**: Employees struggle to prioritize what matters most, often lacking clarity on exact task instructions, expected deliverables, and firm deadlines.
2. **Communication Gaps**: Asking quick clarifying questions without interrupting meetings or long email threads is difficult. Important updates are frequently delayed.
3. **Status Blindspots**: Keeping track of tasks that are completed, ongoing, or pending is fragmented across disparate spreadsheets and chat apps.
4. **Managerial Overhead**: Managers struggle to get a lightweight, real-time pulse of team progress, blockers, and cadence without scheduling redundant check-ins.

### 💡 The Solution
**My Workday** is a centralized, dual-perspective dashboard that brings complete daily clarity:
- **For Employees**: An organized workspace with 3-state task tracking (Pending ➔ Ongoing ➔ Completed), explicit outcome criteria, step-by-step instructions, and instant manager communication.
- **For Managers**: An automated high-level overview detailing team member progress, live blockers, cadence health, and 1:1 sync agendas.

---

## ✨ Key Features

### 👤 Employee Workspace
- **⚡ Daily Priorities & Explicit Outcomes**: Every task features unambiguous success metrics, time estimates, and deadline badges.
- **📋 Progressive Disclosure Clarity Drawer**: Click any task or subtask to open a dedicated modal with checklist items, key resources, and related communication history without visual clutter.
- **🔄 Interactive 3-State Lifecycle**: 1-click status transitions across *Pending*, *Ongoing*, and *Completed* that instantly recalculate the Workday Rhythm gauge.
- **💬 Direct Doubt & Question Dispatch**: Directly message your manager on specific deliverables, complete with resolution timestamps.
- **👥 Squad Current Focus**: Inspect teammates' real-time workstreams and blocker statuses.

### 👔 Manager Overview
- **📊 Team Cadence & Delivery Distribution**: Live visualization of workload progress across team members.
- **🚨 1-Click Blocker Resolution**: Immediate intervention capability on blocked squad deliverables.
- **🤝 Integrated 1:1 Agenda Sync**: Pre-meeting talking points and question review.

### 🛠️ Built-in Seed Data & Scenario Switcher
- Includes a dedicated **"Seed Data"** control in the top navigation with 4 pre-configured real-world scenarios:
  1. ⚡ **Standard Workday**: Balanced cadence, active 1:1 prep, 1 squad blocker.
  2. 🔥 **Sprint Deadline Crunch**: High-urgency P1 tasks and impending deployments.
  3. 🎉 **All Goals Crushed**: 100% completion state for end-of-day satisfaction.
  4. 🌱 **New Hire Day 1**: Onboarding checklists, buddy sessions, and tooling permissions.
- **JSON Live Editor**: Inspect active data or paste custom task structures directly from the UI.

---

## 🚀 Live Demo & Quick Start

Because this project is built with zero-build web technologies (HTML5, Vanilla CSS, Tailwind CSS CDN, and ES6 JavaScript), you can run it instantly without running `npm install`:

### 1. Run Locally
Simply clone the repository and open `index.html` or `dashboard.html` in your favorite browser:
```bash
git clone https://github.com/Dishantjhava/My-Workday.git
cd My-Workday
```
Open `index.html` in your browser (or use VS Code Live Server / Python HTTP server):
```bash
python -m http.server 8000
```
Visit `http://localhost:8000` to preview.

---

## 🌐 Instant Free Deployment

Deploy this project for free in seconds using any of the following platforms:

### Option A: Netlify Drop (10 seconds, zero setup)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `My-Workday` repository folder directly onto the page.
3. Your site is live with a custom HTTPS URL!

### Option B: Vercel CLI
```bash
npx vercel
```
Follow the defaults to deploy directly to Vercel's global edge network.

### Option C: GitHub Pages
1. Go to your repository on GitHub: **Settings** ➔ **Pages**.
2. Under **Build and deployment > Branch**, select `main` and root `/`.
3. Click **Save**. The live link will be generated in 1–2 minutes.

---

## 📁 Repository Structure

```
My-Workday/
├── index.html          # Marketing landing page with feature deep-dives & hero demo
├── dashboard.html      # Centralized dual-perspective interactive application
├── favicon.svg         # Modern 4-square grid vector identity favicon
├── css/
│   └── style.css       # Design tokens, elevation shadows, and micro-animations
└── js/
    ├── app.js          # State management and core dashboard logic
    ├── data.js         # Default datasets, schema definitions, and team members
    └── interactions.js # UI drawers, search filters, and toast notifications
```

---

## 📄 License
Released under the [MIT License](LICENSE).
