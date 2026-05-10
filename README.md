# 📚 BookNest E-Commerce App

An online bookstore built with **MERN stack** (MongoDB, Express, React, Node.js) where users can browse books, manage their cart, and place orders using **Stripe payments** or **Cash on Delivery**.

---

## 🚀 Features

- **Authentication & Authorization** (Signup / Login with JWT)
- **Book Management**
  - Browse available books
  - Filter & Search (category, price, sort)

- **Shopping Cart**
  - Add / Remove / Update items
  - Persist cart with **Redux Persist**

- **Checkout Process**
  - Shipping information form
  - Payment method selection (Stripe / Cash-on-Delivery)
  - Order summary & confirmation page

- **Order Management**
  - Place order & clear cart
  - Orders expire if unpaid (cron job based auto-cancel)
  - View past orders

- **Admin Features** (optional if you plan)
  - Add / Update / Delete books
  - Manage orders & inventory

- **AI Concierge**
  - Natural-language book discovery
  - Smart recommendations based on your query

---

## 🛠️ Tech Stack

**Frontend**

- React
- Redux Toolkit + Redux Persist
- React Hook Form
- TailwindCSS + Lucide Icons

**Backend**

- Node.js + Express.js
- MongoDB + Mongoose
- Stripe API (for card payments)
- Cron jobs for auto-canceling unpaid orders

---

## 📂 Project Structure

```bash
bookstore-app/
BookStore/
├── backend/                          # Backend folder
│   ├── .env                           # Environment variables
│   ├── .env.sample                    # Sample environment file
│   ├── .gitignore                     # Git ignore file
│   ├── app.log                         # Log file
│   ├── package.json                    # Node.js dependencies
│   └── src/                            # Source code folder
│       ├── config/                     # Configurations (Firebase, DB, etc.)
│       ├── controllers/                # API route controllers
│       ├── db/                         # Database connection
│       ├── middlewares/                # Express middlewares
│       ├── models/                      # Database models
│       ├── routes/                      # Express routes
│       └── utils/                       # Utility functions (logger, errors, etc.)
│
├── frontend/                          # Frontend folder
│   ├── .env                            # Environment variables
│   ├── .env.sample                     # Sample environment file
│   ├── .gitignore                      # Git ignore file
│   ├── eslint.config.js                # ESLint config
│   ├── index.html                       # HTML entry point
│   ├── package.json                     # Node.js dependencies
│   ├── postcss.config.js               # PostCSS configuration
│   ├── Readme.md                        # Project readme
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── vite.config.js                  # Vite configuration
│   ├── public/                          # Public static files
│   └── src/                             # Source code
│       ├── App.css                      # App CSS
│       ├── App.jsx                      # App root component
│       ├── index.css                     # Global CSS
│       ├── main.jsx                      # React entry point
│       ├── api/                          # API calls (axios, etc.)
│       ├── app/                          # Redux store and slices
│       ├── assets/                       # Images, GIFs, icons
│       ├── Component/                    # Shared components
│       │   ├── admin/                    # Admin-specific components
│       │   ├── book/                     # Book-specific components
│       │   ├── cart/                     # Cart components
│       │   ├── checkout/                 # Checkout components
│       │   └── customer/                 # Customer-specific components
│       ├── config/                       # App configuration
│       ├── constant/                     # App constants
│       ├── feature/                      # Redux features or hooks
│       └── pages/                        # Pages
│           ├── admin/                    # Admin pages
│           ├── customer/                 # Customer pages
│           ├── order/                    # Order pages
│           └── book/                     # Book pages

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/faizan-siddique193/BookNest.git

```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

## 👨‍💻 Author

Developed by **Faizan Siddique** 🚀

---
