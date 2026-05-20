# MediQueue - Elite Tutor Booking Architecture

## 🔗 Live Application
**Live Site URL:** [[https://mediqueue-tutorbooking-system.vercel.app/](https://mediqueue-tutorbooking-system.vercel.app/)]

## 📖 Project Overview
MediQueue is a premium, fully responsive tutor booking platform engineered to bridge the gap between students and verified educators globally. Built with a modern glassmorphic UI, it eliminates scheduling conflicts and provides a seamless digital session management experience.

## ✨ Core Features & Functionalities

- **Advanced Authentication Architecture:** Secure email/password and Google social login powered by Firebase, fortified with JWT (JSON Web Token) for protected private routing and unauthorized access prevention.
- **Dynamic Search & Temporal Filtering:** Features a high-performance mentor discovery engine allowing users to search tutors by name (case-insensitive regex) and filter chronologically using registration start and end date parameters.
- **Micro-State Management System:** A dedicated dashboard for users to independently manage (Update/Delete) their registered educator profiles with real-time UI synchronization without page reloads.
- **Conflict-Free Session Booking:** An intuitive booking flow that prevents duplicate registrations for the same session, complete with instantaneous visual feedback via premium modal interfaces.
- **Global Theme Persistence:** A fully integrated Light/Dark mode toggle that seamlessly shifts the entire application's aesthetic between environments, with state persistence utilizing browser local storage.

## 🛠️ Technology Stack
- **Frontend:** React.js, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication & Security:** Firebase, JWT
- **UI Components:** Swiper, React Icons, SweetAlert2, React Hot Toast