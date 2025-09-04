
# 📚 BookNest E-Commerce App

An online bookstore built with **MERN stack** (MongoDB, Express, React, Node.js) where users can browse books, manage their cart, and place orders using **Stripe payments** or **Cash on Delivery**.

---

## 🚀 Features

* **Authentication & Authorization** (Signup / Login with JWT)
* **Book Management**

  * Browse available books
  * Filter & Search
* **Shopping Cart**

  * Add / Remove / Update items
  * Persist cart with **Redux Persist**
* **Checkout Process**

  * Shipping information form
  * Payment method selection (Stripe / Cash-on-Delivery)
  * Order summary & confirmation page
* **Order Management**

  * Place order & clear cart
  * Orders expire if unpaid (cron job based auto-cancel)
  * View past orders
* **Admin Features** (optional if you plan)

  * Add / Update / Delete books
  * Manage orders & inventory

---

## 🛠️ Tech Stack

**Frontend**

* React
* Redux Toolkit + Redux Persist
* React Hook Form
* TailwindCSS  + Lucide Icons

**Backend**

* Node.js + Express.js
* MongoDB + Mongoose
* Stripe API (for card payments)
* Cron jobs for auto-canceling unpaid orders

---

## 📂 Project Structure

```bash
bookstore-app/
├── backend/
│   ├── models/        # Mongoose schemas (User, Book, Cart, Order, Payment)
│   ├── routes/        # API routes
│   ├── controllers/   # Express controllers
│   ├── middlewares/   # Auth & error handlers
│   └── server.js      # Main backend entry
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # App pages (Home, Cart, Checkout, Orders, etc.)
│   │   ├── redux/        # Redux slices
│   │   └── App.js        # Main React entry
│   └── public/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/bookstore-app.git
cd bookstore-app
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-cluster
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=your-stripe-key
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
npm start
```

---

## 📸 Screenshots (optional)

*Add here some images of UI: home page, cart, checkout, order confirmation.*

---

## 🔮 Future Improvements

* Wishlist / Favorites
* Email notifications for order confirmation
* Admin dashboard
* Ratings & Reviews for books

---

## 👨‍💻 Author

Developed by **Faizan Siddique** 🚀

---

