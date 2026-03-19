# AdventoursCR Nihongo - Project PRD

**Document Version:** 1.0
**Status:** Approved
**Platform:** Mobile-First (APK via Capacitor)
**Design Philosophy:** Tactile Zen & 3D Bubble Play

---

## 1. Executive Summary
AdventoursCR Nihongo is a premium Japanese learning application designed to bridge the gap between academic study and practical, professional application. Utilizing a unique 12-level curriculum divided into three thematic phases (Cimientos, Color, and Fluidez), the app provides a meditative yet playful environment for mastering Japanese grammar, vocabulary, and sentence structure.

---

## 2. Problem Statement
Traditional language apps often feel flat, sterile, or overly game-like without providing deep structural understanding. Learners struggle with:
*   Understanding the "why" behind grammar particles (WA, GA, WO).
*   Visualizing sentence structure (SOV vs SVO).
*   Connecting vocabulary to professional, real-world contexts.
*   Maintaining long-term motivation without a clear, culturally resonant progression system.

---

## 3. Goals & Objectives
*   **Primary Goal:** Enable users to achieve functional Japanese literacy through a structured 12-level curriculum.
*   **Secondary Goals:**
    *   Provide instant structural analysis ("Radiografía") for any Japanese sentence.
    *   Gamify the learning process using the "Bushido Path" (XP and Belt progression).
    *   Offer 24/7 AI-powered tutoring with a "Zen" personality.
*   **Non-Goals:** This version does not include real-time voice recognition or social competitive leaderboards.

---

## 4. Target Audience
*   **Self-taught learners:** Seeking a structured path outside of traditional JLPT levels.
*   **Professional students:** Needing context for Business, Medical, or Legal Japanese.
*   **Visual learners:** Who benefit from 3D UI, color-coded grammar, and structural breakdowns.

---

## 5. Solution Overview & Key Features

### A. Smart Translator ("Radiografía Gramatical")
*   **Feature:** A visual breakdown tool that "dissects" sentences.
*   **Functionality:** Identifies subjects, objects, verbs, and particles (WA, WO, NI). Uses 3D bubble components to represent sentence blocks.
*   **Hanko Trigger:** Valid translations trigger a visual "Hanko" (stamp) of approval.

### B. Zen AI Sensei (Chat)
*   **Feature:** An AI tutor powered by Gemini 2.0 Flash (with DeepSeek fallback).
*   **Functionality:** Answers grammar questions, explains cultural nuances, and provides examples in a calm, commercial-zen tone.

### C. Dynamic 3D Library (Dictionary)
*   **Feature:** A specialized dictionary with professional contexts.
*   **Functionality:** Features 3D rotating cards with "Technical Sheets" for Business, Medical, and Legal fields.

### D. Bushido Progression System
*   **Feature:** A holistic gamification engine.
*   **Functionality:** Tracks XP, daily streaks, and levels users through belts (Blanco to Negro).
*   **Visuals:** Sakura progress bars and 3D belt icons.

### E. Spaced Repetition Flashcards
*   **Feature:** Daily study sessions.
*   **Functionality:** 10-word daily sets with 3D flip animations to reinforce "Mastery Strength."

---

## 6. Technical Considerations & Integrations
*   **Frontend:** Next.js 15 (App Router) with React 19.
*   **Styling:** Tailwind CSS 4.0 using the "3D Bubble" utility classes and "Tactile Zen" palette.
*   **Backend:** Firebase (Firestore for vocabulary/progress, Anonymous Auth).
*   **Mobile Bridge:** Capacitor for native Android (APK) deployment.
*   **AI:** Multi-tier strategy using @google/generative-ai (Free tier/Zero cost) and DeepSeek API.
*   **Persistence:** LocalStorage caching for "Zero Cost" Firestore operations.

---

## 7. Success Metrics
*   **Retention:** 7-day streak maintenance for >40% of active users.
*   **Engagement:** Average of 5 "Radiografías" performed per session.
*   **Progression:** User advancement from Fase 1 to Fase 2 within 30 days of active study.

---

## 8. Risks & Assumptions
*   **Risk:** API latency for AI responses. *Mitigation:* Local deterministic response engine as a final fallback.
*   **Assumption:** Users prefer a "curriculum-based" approach over a standard dictionary search.
*   **Cost Management:** Assumption that Firebase Spark plan and Gemini Free tier will sustain initial user growth.

---

## 9. Aesthetics (The "Look & Feel")
*   **Colors:** Japan Red (#EF3340), Soft Mint (#98FFD9), Sky Blue (#87CEEB).
*   **Components:** 2rem rounded borders, 4px/8px bottom-border extrusions (3D effect), and backdrop-blur glassmorphism.
*   **Mascot:** A persistent Sensei character providing contextual encouragement.
