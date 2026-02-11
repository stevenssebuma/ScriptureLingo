# 📖 ScriptureLingo

ScriptureLingo is a mobile-first, Duolingo-style learning app designed to help members of The Church of Jesus Christ of Latter-day Saints study, understand, memorize, and correctly cite scripture in a fun, consistent, and engaging way.

The app uses gamification, quizzes, citation challenges, and progress tracking to make daily scripture study approachable and rewarding.

---

## ✨ Features

- 📱 **Mobile App (iOS & Android)** built with React Native
- 📖 Study all standard works:
  - Book of Mormon
  - Bible (KJV)
  - Doctrine & Covenants
  - Pearl of Great Price
- 🧠 Interactive learning modes:
  - Multiple-choice quizzes
  - Fill-in-the-blank scripture exercises
  - Citation trainer
  - Verse ordering challenges
- 🔥 Gamification:
  - Daily streaks
  - XP and leveling system
  - Badges and achievements
  - Weekly challenges
- 📊 Progress tracking and statistics
- 📝 Highlights, notes, and saved verses
- 🔔 Push notifications for daily reminders
- 📶 Offline-friendly lesson access

---

## 🛠 Tech Stack

### Frontend (Mobile)
- **React Native**
- **Expo**
- Expo Router
- React Native Reanimated
- React Native Gesture Handler
- NativeWind (Tailwind for React Native)
- Lottie Animations

### Backend
- **Node.js**
- **Express.js**
- REST API architecture
- JWT-based authentication

### Database
- **PostgreSQL**
- **Supabase**

### Hosting & Services
- Expo EAS (build & deployment)
- Supabase / Render / Railway (backend & database)
- Vercel (optional web admin dashboard)

---

## 🧩 App Structure

```txt
/app
  /auth
  /home
  /learn
  /lesson
  /quiz
  /challenges
  /profile
/services
  api.ts
  auth.ts
  progress.ts
/store
  userStore.ts
  progressStore.ts
