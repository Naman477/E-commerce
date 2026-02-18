# Elevate Commerce

A modern, full-stack e-commerce application built with React, Vite, and Firebase. This project features a robust admin dashboard, seamless shopping experience, and integrated chatbot support.

## 🚀 Key Features

### User Experience
- **Browse Products:** View a wide range of products with detailed descriptions and images.
- **Shopping Cart:** Add items to cart, view summary, and proceed to checkout.
- **Secure Checkout:** Streamlined checkout process.
- **User Accounts:** Registration, login, and profile management.
- **Order History:** View past orders and their status.
- **Dark Mode:** Built-in theme switching support.
- **AI Chatbot:** Integrated chatbot for customer support.

### Admin Dashboard
- **Overview:** Visual statistics for sales, orders, and products.
- **Product Management:** Add, edit, and delete products.
- **Order Management:** View and manage customer orders.
- **Data Migration:** Tools for migrating or initializing data.

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Firestore, Auth)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest) & React Context API
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Naman477/E-commerce.git
    cd E-commerce
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
