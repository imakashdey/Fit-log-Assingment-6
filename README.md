# 💪 FitLog — Workout Library & Training Log

FitLog is a dark-themed, no-nonsense gym companion and workout planning web application built with **Next.js (App Router)** and **Tailwind CSS**. Users can browse a comprehensive library of exercises covering every major muscle group, inspect key workout specifications, add lifts to their daily plan with live metric summaries, save workouts for later, and track completed exercises.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router Architecture)
- **Language:** [TypeScript](https://www.typescriptlang.org/) & JavaScript (ES6+)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Data Source:** Worker REST API (`/api/fitlog` and `/api/fitlog/:id`)
- **State Management & Persistence:** React Context API + LocalStorage

---

## ✨ Key Features (Minimum 5)

1. **🏋️ Comprehensive Workout Library:**
   - Browse 12 targeted exercises covering all major muscle groups in a responsive 3-column card grid.
   - Each card displays muscle group badges, workout name, equipment, duration, calories burned, and user ratings.

2. **📋 Deep Workout Details & Instructions:**
   - Dedicated dynamic routes (`/details/[id]`) with a clean 2-column layout.
   - High-resolution visual media, comprehensive key specifications (Sets, Reps, Equipment, Difficulty), and step-by-step performance instructions.

3. **📊 Dynamic Training Plan & Live Metrics Tracker:**
   - Real-time aggregation of total planned exercises, total duration (minutes), and estimated calories burned.
   - Daily cap of 5 lifts per day to ensure realistic and focused training intent.

4. **⚡ Interactive Tab Management & Live Sorting:**
   - Toggle seamlessly between **Today's Plan** and **Saved Workouts**.
   - Live sorting capability dropdown by **Duration**, **Calories Burned**, and **Rating**.

5. **🎯 Status Tracking, Toast Feedback & Data Persistence:**
   - Mark individual workouts as done with visual completion state and toast notifications.
   - Remove workouts with instant toast confirmation.
   - Persistent workout storage via `localStorage` so data survives browser reloads.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git
   cd B14-A6-Fit-Log/assingment-6-fit-gym
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to explore the app.

---

## 📱 Responsive Design
- Optimized for mobile (320px+), tablet, and desktop screens with fluid typography and dynamic collapsible navigation.

---

## 📄 License & Credits
Created for **Programming Hero Batch 14 — Assignment 6**.
© 2026 FitLog — Workout Library. Train hard, log honest.
