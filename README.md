# Ecommerce - HP

A modern, full-featured Ecommerce mobile application built with **React Native** and **Expo**. This project combines a premium UI/UX with a robust backend integration to provide a seamless shopping experience.

---

## 🚀 Features

### 🛒 Shopping Experience
- **Dynamic Banners**: Interactive banner sliders for promotions.
- **Product Categories**: Browse products by category with ease.
- **Flash Sales**: Dedicated section for time-sensitive deals.
- **Just For You & Popular**: Personalized and trending product lists.
- **Product Details**: Detailed view with descriptions, images, and related products.
- **Shopping Cart**: Full cart management (add, remove, update quantities).

### 🔐 Authentication & Security
- **Multi-step Auth**: Start screen, Login, and Registration.
- **Password Recovery**: Integrated Forgot Password, Reset Password, and New Password flows.
- **User Profile**: Manage user information and order history.

### 🌐 Web Support
- Optimized for Web with **Expo Router**.
- **Custom Favicons**: Professional favicon set for all devices.
- **SEO Ready**: Configured title and meta-tags.

---

## 🛠️ Technology Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (Link-based routing)
- **Styling**: 
  - [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
  - [NativeBase](https://nativebase.io/) (Accessible component library)
  - [React Native Paper](https://reactnativepaper.com/)
- **State Management**: React Context API (`AuthContext`, `CartContext`)
- **API Client**: [Axios](https://axios-http.com/) with centralized service layer.
- **Icons**: Expo Vector Icons & Material Design Icons.

---

## 📂 Project Structure

```text
├── _components/        # Reusable UI components (Banner, Header, etc.)
├── api/                # API definitions (if applicable)
├── app/                # Expo Router directory (screens and layouts)
│   ├── (tabs)/         # Main navigation tabs (Home, Cart, Profile)
│   ├── auth/           # Authentication screens
│   ├── product/        # Product detail routes
│   └── _layout.js      # Root layout and context providers
├── assets/             # Images and local assets
├── contexts/           # Global state (Cart, Auth)
├── services/           # API service layer (Product, User, Order)
├── public/             # Static web assets (Favicons, Manifest)
└── app.json            # Expo configuration
```

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
- **Start Expo development server**:
  ```bash
  npx expo start
  ```
- **Run on Web**:
  ```bash
  npx expo start --web
  ```
- **Run on Android**:
  ```bash
  npx expo start --android
  ```
- **Run on iOS**:
  ```bash
  npx expo start --ios
  ```

---

## 📄 License

This project is part of a student assignment by **Phan Văn Hoàng (2123110351)**.
All rights reserved © 2026.
