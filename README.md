# TransferMate – UC Transfer Guidance Web App

TransferMate is a web application designed to help California community college students navigate the complex University of California (UC) transfer process with clarity and confidence. Built by a UCLA transfer student, the platform enables users to track their academic progress, GPA, and major-specific requirements across multiple UC campuses.

[Coming Soon]  
(Currently pitching to institutional partners; ASSIST.org API integration in progress.)

---

## Features

- Track IGETC and UC 7-course pattern progress  
- Monitor completed courses, transferable units, and GPA  
- Compare major-specific prep across different UC campuses  
- Personalized dashboard generated dynamically based on user input  
- User authentication with persistent Firestore database integration  
- Real-time updates and course tracking for transparency and ease

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend / Database**: Firebase (Firestore), Firebase Auth  
- **Routing**: React Router  
- **Design/Prototyping**: Figma  
- **Deployment**: Vercel

---

## How It Works

1. **User Sign-Up** – Students create an account using Firebase Auth.  
2. **Survey Input** – Users enter completed coursework, exam credit, and school preferences.  
3. **Dynamic Dashboard** – The app renders personalized transfer progress based on course history.  
4. **Future Feature Roadmap** – Exploring integration with ASSIST.org API to auto-populate articulation data.

---

## Installation

To run locally:

```bash
git clone https://github.com/kylewxng/transfermate.git
cd transfermate
npm install
npm start
