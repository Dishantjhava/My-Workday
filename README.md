<div align="center">

# ⚡ My Workday

### Daily clarity for employees. Effortless alignment for managers.

A lightweight, zero-build, dual-perspective dashboard designed to kill ambiguity, organize daily priorities, and turn messy workdays into focused flow states.

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20HTML%20%2F%20CSS%20%2F%20JS-facc15?style=flat-square&labelColor=1c1917)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CDN-38bdf8?style=flat-square&labelColor=1c1917)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Type-Weekend%20Fun%20Project-emerald?style=flat-square&labelColor=1c1917)](#-built-for-fun)

[**Explore Live Demo**](https://dishantjhava.github.io/My-Workday/) • [**Key Features**](#-what-it-actually-does) • [**Architecture**](#-under-the-hood) • [**Try Scenarios**](#-seed-data--scenario-switcher)

---

</div>

## 💡 Built for Fun!

> *"Why does tracking a workday have to feel like wrestling a spreadsheet?"*

I created **My Workday** purely as a **fun passion project and design experiment**. 

I wanted to explore what happens when you strip away the bloated enterprise software noise (nested dropdowns, 50-field forms, endless status meetings) and replace it with a clean, tactile, and genuinely enjoyable interface that solves the two biggest headaches in everyday work:

1. **For Employees**: *"What do I actually need to get done today, by when, and what does 'done' look like?"*
2. **For Managers**: *"Is the team on track without me having to interrupt people with 'Any update?' messages?"*

No heavy frameworks, no 300MB `node_modules` folders, no backend database setup required—just pure web fundamentals crafted with care.

---

## 🧭 The Core Problem & How We Solve It

```
Traditional Workplace Chaos                      My Workday Solution
┌───────────────────────────────┐               ┌────────────────────────────────┐
│ Vague priorities & deadlines  │  ─────────▶   │ Explicit outcomes & P1-P3 tags │
│ Endless "Any update?" pings   │  ─────────▶   │ 1-Click 3-state task lifecycle │
│ Doubts lost in Slack threads  │  ─────────▶   │ In-context Doubt Dispatch box  │
│ Managers in the dark          │  ─────────▶   │ Live squad sync & blocker view │
└───────────────────────────────┘               └────────────────────────────────┘
```

---

## ✨ What It Actually Does

### 1. 👤 Employee Workspace
- **Unambiguous Outcomes**: Every task card features an explicit success definition (not just *"Work on auth"* but *"Zero token leaks in staging logs, fallback to refresh token on 401"*).
- **Progressive Disclosure**: Task cards stay clean and scannable on your screen. Click any task to open a detailed **Task Clarity Drawer** with checklist items, relevant docs, and conversation history.
- **3-State Tactile Tracking**: 
  $$\text{Pending} \xrightarrow{\text{1 Click}} \text{Ongoing} \xrightarrow{\text{1 Click}} \text{Completed}$$
  Every click immediately recalculates your daily **Workday Rhythm Gauge** and updates team health metrics.
- **Doubt Dispatch**: Ask questions directly tied to a task without opening separate chat apps.

### 2. 👔 Manager Alignment View
- **One-Click Perspective Switch**: Instantly toggle from the employee view to the manager view from the navigation bar.
- **Live Team Cadence**: Visual breakdown of squad members' current focus, progress bars, and completion rates.
- **Blocker Resolution**: Spot who is blocked (e.g. *"Blocked on API Spec"*) and clear blockers directly from the interface.
- **1:1 Sync Prep**: Keep structured talking points ready for your next check-in.

### 3. 🧪 Built-in Seed Data & Scenario Switcher
Want to test the app under different conditions? Click the **"Seed Data"** button in the header to instantly simulate 4 real-world team states:

| Scenario | What It Simulates |
| :--- | :--- |
| ⚡ **Standard Workday** | Balanced workload, regular priorities, 1 active squad blocker. *(Default)* |
| 🔥 **Sprint Crunch** | High-urgency P1 tasks, impending cutovers, and tight deadlines. |
| 🎉 **All Goals Crushed** | 100% completion state, cadence maxed out, ready for wrap-up. |
| 🌱 **New Hire Day 1** | Fresh onboarding tasks, buddy introductions, and tooling setups. |

*(There's also a raw **JSON Live Editor** built right into the modal if you want to paste your own custom datasets on the fly!)*

---

## 🛠️ Under the Hood

Built following the **zero-build philosophy**—it runs straight out of the box in any browser with zero compilation steps.

```
My-Workday/
├── index.html          # Marketing showcase & feature walkthrough
├── dashboard.html      # Central app (Dual-perspective workspace + Seed Engine)
├── favicon.svg         # Clean 4-square grid brand mark
├── css/
│   └── style.css       # Custom design tokens, glassmorphism, micro-animations
└── js/
    ├── app.js          # Reactive state machine & rhythm calculation
    ├── data.js         # Default datasets, employee profiles & schemas
    └── interactions.js # Drawers, search filters, toast notifications
```

- **Runtime**: Pure Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN) + Bespoke Vanilla CSS design tokens & animations
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Icons**: Hand-tuned vector SVG line icons (no heavy font-icon libraries or AI cartoon stickers)

---

## 🚀 Run It Locally in 5 Seconds

No `npm install`, no build tools, no configuration needed:

```bash
# 1. Clone the repository
git clone https://github.com/Dishantjhava/My-Workday.git

# 2. Go to the project directory
cd My-Workday

# 3. Open index.html in your browser!
# On Windows PowerShell:
Start-Process index.html

# Or run a quick Python server if you prefer:
python -m http.server 8000
```

---

## 🌐 Deploy It Yourself

Want to host your own copy? You can deploy it for free in seconds:

- **GitHub Pages**: Go to `Settings` ➔ `Pages` ➔ Select `main` branch ➔ Save.
- **Netlify Drop**: Drag and drop the `My-Workday` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` inside the folder.

---

## 👨‍💻 Created By

**Dishant Jhava**  
- GitHub: [@Dishantjhava](https://github.com/Dishantjhava)  
- Email: [dishantjava06690@gmail.com](mailto:dishantjava06690@gmail.com)

*If you liked this project or found the UX ideas interesting, feel free to star ⭐ the repo!*
