# 💸 FundFlow

**FundFlow** is a modern, minimalistic budget tracking app built as part of a university group project. It allows users to manage their personal finances by tracking income, expenses, and savings with real-time updates and authentication. This project demonstrates the use of modern development tools in both frontend and backend environments while following professional software documentation and version control practices.

## 🚀 Project Overview

FundFlow was developed to simplify personal financial management for users through a clean and intuitive mobile interface. The app offers features inspired by industry-leading apps such as Wise, with a clear focus on:

- 📈 Expense and income tracking  
- 💰 Savings goal management  
- 🔐 Secure account creation and login  
- ⚡ Real-time updates and syncing

## 🧑‍💻 Technologies Used

### Frontend
- **React Native** (Expo) — Cross-platform mobile development
- **Clerk** — Authentication and session management
- **Redis** — Real-time state management (planned)
- **TailwindCSS (via NativeWind)** — Consistent and efficient styling

### Backend
- **Node.js** — Runtime for building scalable server-side logic
- **Express.js** — Web framework for routing and API design
- **PostgreSQL** — Relational database for storing user and transaction data
- **Neon** — Serverless PostgreSQL hosting

### Design
- **Figma** — Used for UI prototyping with minimalist dark mode designs  
- SF Pro font, green-to-gold gradients, rounded shapes, and custom UI components like pills, circles, segmented control bars

## 👥 Group Contribution

This was a collaborative project, where roles were divided for research, design, development, and documentation.

### Individual Role (Eduardo C.)
- Built a modern UI design prototype in **Figma**, including:
  - A customized **color palette** and **text style** collection
  - Components like input forms, control panels, and navigation bars
- Analyzed the **Wise app** for inspiration and prioritized features using the **MoSCoW method**
- Created documentation and README structure
- Responsible for integrating authentication via **Clerk** and backend setup using **Node.js** and **Express**

## 🔍 Features Under Development

- Dashboard for tracking weekly/monthly spending
- Savings goal with progress bars
- Custom notifications
- Integration with real banking APIs (research phase)

```

## 🛠️ Installation

> This assumes Expo CLI is installed and PostgreSQL database is configured (Neon or local).

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fundflow.git
cd fundflow

# Install dependencies
npm install

# Start the development server
npx expo start
```

Backend setup (Express):

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the project root based on `.env.example` and fill in your
database credentials and API keys before starting the server.

## 📲 Expo Preview

This app runs on **Expo Go**. To preview on your phone:

1. Install **Expo Go** from App Store / Google Play.
2. Run `npx expo start` and scan the QR code.

## ⚠️ Notes

- This app is a university project and **not intended for commercial or production use**.
- Some packages may use outdated or deprecated methods for learning purposes.
- No sensitive user data is stored or transmitted beyond the local environment.

## 📚 License

This repository is licensed for **educational purposes**. No redistribution or commercial use is allowed without explicit permission.
