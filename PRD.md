### **AdventoursCR Nihongo - Project PRD / Brief**

**Document Version:** 1.4
**Date:** 2026-03-19
**Author:** Jules (AI Lead Engineer)
**Status:** Approved

---

**1. Executive Summary**
AdventoursCR Nihongo is a premium Japanese learning application optimized for mobile deployment (APK via Capacitor). It utilizes a unique 12-level curriculum divided into three thematic phases: Fase 1 (Cimientos), Fase 2 (Color), and Fase 3 (Fluidez). The application focuses on structural analysis, specialized professional vocabulary (Business, Medical, Legal), and an immersive, tactile 3D aesthetic ("Tactile Zen") to provide a meditative playground for students.

---

**2. Problem Statement**
Japanese learners often struggle with the transition from standard SVO (Subject-Verb-Object) languages to Japanese's SOV structure and particle system. Existing apps frequently lack:
*   Visual "dissection" of sentence grammar.
*   Context-specific vocabulary for high-level professional environments.
*   A physical, tactile interface that rewards progress with cultural resonance (like the Hanko seal).
*   Integrated, context-aware AI tutoring that respects a "Zen" commercial tone.

---

**3. Goals & Objectives**
*   **Primary Goal:** Enable functional literacy and structural mastery of Japanese across 12 levels.
*   **Secondary Goals:**
    *   Implement "Radiografía Gramatical" for real-time sentence analysis.
    *   Achieve "Zero Cost" scalability using Firebase Spark and Gemini Free-tier AI.
    *   Maintain a high-engagement gamification system (XP, Streaks, Belts).
    *   Provide a library of 1,000+ verbs with 3D flashcard interaction.
*   **Non-Goals:** Real-time audio conversation or multiplayer competitive leaderboards in the initial APK release.

---

**4. Target Audience**
*   **Self-taught enthusiasts:** Seeking a structured, visual path to fluency.
*   **International Professionals:** Needing Medical, Legal, or Business Japanese terminology.
*   **Kinesthetic/Visual Learners:** Who benefit from "Tactile Zen" 3D interactions and color-coded grammar.

---

**5. Solution Overview & Key Features**
*   **Smart Translator ("Radiografía"):** A tool that breaks down phrases into romaji, particles, and grammatical roles (Subject, Object, Verb) with 3D bubble visuals.
*   **Zen AI Sensei:** A multi-tier AI chat fallback system (Gemini 2.0 -> 1.5 -> DeepSeek -> Local) providing a helpful, calm tutor personality.
*   **Kawaii Mascot:** A draggable "Fox Sensei" SVG that provides interactive messages and moves freely on the mobile canvas.
*   **Bushido Path:** A gamification system tracking progress from White Belt (Blanco) to Black Belt (Negro) via XP and streaks.
*   **3D Professional Dictionary:** Specialized terminology cards with rotating 3D animations and "Technical Sheets" for usage context.
*   **Grammar Manual:** A searchable curriculum navigator for the 12-level system.
*   **SRS Flashcards:** A daily study engine with flip-card mechanics.

---

**6. User Stories / Requirements**
*   **Grammar Analysis:** *As a learner, I want to type a sentence and see its visual "Radiografía" highlighting the particles 'wa' and 'wo' so I can understand their structural roles.*
*   **Professional Context:** *As a business professional, I want to search for "Contract" and see the 3D card for 契約 (Keiyaku) with usage examples so I can use it correctly in a meeting.*
*   **Gamification:** *As a user, I want to earn XP for every study session and maintain my "Fire" streak so I can advance from Orange Belt to Green Belt.*
*   **AI Tutoring:** *As a student, I want to ask the Zen AI Sensei a question about complex grammar and receive an explanation that fits the commercial-zen tone of the app.*
*   **Navigation:** *As a mobile user, I want a draggable mascot so I can move it away from text I'm trying to read without losing the Sensei's presence.*
*   **Spaced Repetition:** *As a learner, I want to review 10 daily words using flashcards so I can reinforce my mastery of new vocabulary over time.*
*   **Review:** *As a user, I want to see my last 20 dissected phrases in a history list so I can quickly review previous learning moments.*

---

**7. Technical Considerations & Integrations**
*   **Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4.0.
*   **Mobile Bridge:** Capacitor 8.0+ for native Android APK generation.
*   **Database:** Firebase Firestore with LocalStorage caching for offline-first behavior and cost minimization.
*   **AI Integration:** @google/generative-ai (Spark Plan compatible).
*   **Design Tokens:** Specialized palette including Japan Red (#BA0023) and Soft Mint (#8FF6D0), with 2rem (lg) ultra-rounding for the "Bubble" effect.

---

**8. Success Metrics**
*   **Daily Engagement:** Average of 15 minutes of study per active user.
*   **Curriculum Advancement:** >30% of users reaching Fase 2 within their first month.
*   **Accuracy:** Successful "Radiografía" mapping for 95% of standard Level 1-5 Japanese sentence structures.

---

**9. Risks & Assumptions**
*   **Risks:** Potential AI API downtime. *Mitigation:* Multi-provider fallback and deterministic local responses.
*   **Assumptions:** Mobile users prefer a persistent bottom-navigation bar for quick context switching between Learn, Library, and AI tools.

---

**10. High-Level Timeline**
*   **Fase 1 (Cimientos):** Core structure, particles, and Level 1-4 Grammar logic. (Complete)
*   **Fase 2 (Color):** 1000-verb database, specialized contexts, and Belt Path. (Complete)
*   **Fase 3 (Fluidez):** AI Tutor refinement, PWA/APK optimization, and final polishing. (Active)

---

**11. Stakeholders**
*   **Owner:** AdventoursCR Learning Team.
*   **Lead Engineer:** Jules (Lead Agent).
*   **Deployment:** Google Play Store (via Capacitor APK).
