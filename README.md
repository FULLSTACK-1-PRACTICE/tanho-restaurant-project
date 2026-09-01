# 🍽️ Tanho Restaurant

**Tanho Restaurant** is a modern restaurant management and customer-facing web application developed as a real-world practice project by the **SFERA IT Academy — Fullstack 1 Team**.

The project is designed to provide a complete digital solution for restaurant operations, combining a customer-facing website with role-based management dashboards.

The main purpose of the project is to gain practical experience by working on a real project in a team environment, following professional development workflows, and applying modern frontend and software development practices.

---

## 📌 About the Project

Tanho Restaurant is being developed as a fullstack application with multiple user roles and dedicated interfaces for different responsibilities within the restaurant.

The application includes:

* Customer-facing restaurant website
* Menu and food management
* Order management
* Table management and reservations
* Payment management
* Restaurant statistics and reports
* Role-based dashboards
* User authentication and profile management
* Administrative management features

Each role has access to functionality appropriate to its responsibilities.

### 👤 User

Customers can:

* Browse the restaurant website
* Explore the menu and food categories
* View food details
* Place orders
* Reserve tables
* Manage their account and profile

### 🛠️ Admin

The Admin dashboard is designed for managing the restaurant's core operations, including:

* Orders
* Table reservations
* Restaurant data
* Users
* Payments
* General operational information

### 💳 Cashier

The Cashier dashboard focuses on payment and order operations:

* View today's orders
* Process payments
* Manage payment-related operations
* Monitor completed and pending orders

### 📊 Manager

The Manager dashboard provides an overview of restaurant operations and performance:

* Revenue statistics
* Order statistics
* Most popular dishes
* Restaurant performance information
* Notifications
* Food and menu management
* Categories
* Add-ons
* Management tools

---

## 🏗️ Project Architecture

The project is structured around a modular architecture to keep the codebase scalable, maintainable, and easy to work with as a team.

The frontend follows a feature-oriented structure with separate layouts and modules for different parts of the application.

```text
src/
├── components/
├── constants/
├── features/
│   ├── auth/
│   ├── categories/
│   ├── employees/
│   ├── menu/
│   ├── payments/
│   ├── reports/
│   ├── users/
│   └── ...
├── layouts/
│   ├── AdminLayout/
│   ├── CashierLayout/
│   ├── ManagerLayout/
│   └── UserLayout/
├── locales/
├── lib/
├── pages/
├── types/
└── ...
```

This structure allows different team members to work on separate features without unnecessarily affecting other parts of the application.

---

## 💻 Technologies

The project is built using modern web technologies and development tools.

### Frontend

* **React** — UI development
* **TypeScript** — Type-safe development
* **Vite** — Development server and build tool
* **Tailwind CSS** — Utility-first styling
* **React Router** — Client-side routing
* **TanStack Query** — Server-state and data management
* **ESLint** — Code quality and consistency

### Development Tools

* **Git** — Version control
* **GitHub** — Repository hosting and collaboration
* **pnpm** — Package management
* **VS Code** — Development environment

---

## 👨‍💻 Development Team

Tanho Restaurant is being developed by the:

**SFERA IT Academy — Fullstack 1 Team**

The project is developed as part of the academy's practical internship program, where team members work together on a real-world application.

The team follows a collaborative development process where tasks are divided between developers according to their responsibilities.

---

## 🔄 Development Workflow

The team uses a structured Git and GitHub workflow to maintain code quality and organize development.

The general workflow is:

```text
Issue
  ↓
Feature Branch
  ↓
Development
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Code Review
  ↓
Merge
```

### Git & GitHub Practices

The project uses:

* Git for version control
* GitHub Issues for task management
* GitHub Projects for workflow management
* Feature branches for isolated development
* Pull Requests for submitting changes
* Code reviews before merging
* `develop` for ongoing development
* `main` for stable project code

Each developer works on a dedicated branch for their assigned task and submits the completed work through a Pull Request.

---

## 📋 Task Management

Tasks are organized using **GitHub Issues** and **GitHub Projects**.

The team uses a Kanban-style workflow to track:

* Backlog tasks
* Tasks in progress
* Completed tasks
* Bugs and fixes
* Feature development

This workflow helps the team clearly understand the current project status and each developer's responsibilities.

---

## 🌿 Branching Strategy

The project follows a feature-based branching strategy.

Example:

```text
main
│
└── develop
    │
    ├── feature/navbar
    ├── feature/menu
    ├── feature/hero
    ├── feature/dashboard
    └── feature/auth
```

Developers create separate branches for their tasks instead of working directly on the main branch.

After completing a task:

```text
feature/* → Pull Request → Code Review → develop
```

Stable releases can then be merged into:

```text
develop → main
```

---

## 🎯 Project Goals

The main goals of Tanho Restaurant are:

* Build a realistic restaurant web application
* Practice professional frontend development
* Gain experience working with React and TypeScript
* Improve Git and GitHub skills
* Learn collaborative software development
* Practice feature-based project architecture
* Work with role-based interfaces
* Follow professional code review workflows
* Gain experience working in a development team
* Prepare the project for real-world usage

---

## 🚧 Project Status

**Status: In Development**

Tanho Restaurant is an active practice project.

The application is being developed incrementally, with new features, improvements, dashboards, and management functionality being added throughout the development process.

The frontend development phase is being completed as part of the **SFERA IT Academy Fullstack 1** team's practical internship, while the overall application continues to evolve as a fullstack project.

---

## 📁 Project Scope

The project covers several major areas:

```text
Customer Website
       │
       ├── Home
       ├── Menu
       ├── About
       ├── Blog
       ├── News
       └── Contact

Management System
       │
       ├── Admin Dashboard
       ├── Manager Dashboard
       

Core Features
       │
       ├── Authentication
       ├── Users
       ├── Menu
       ├── Orders
       ├── Tables
       ├── Payments
       ├── Categories
       ├── Reports
       └── Notifications
```

---

## 🤝 Team Collaboration

The project is developed collaboratively by the **SFERA IT Academy Fullstack 1 Team**.

Team members work on assigned tasks independently while following a shared project structure and development workflow.

Communication, task tracking, source control, code reviews, and integration are handled as part of the team's regular development process.

---

## 📚 What This Project Provides

Working on Tanho Restaurant provides practical experience in:

* React application development
* TypeScript
* Tailwind CSS
* Component-based architecture
* Role-based interfaces
* State and server-state management
* Routing
* Git and GitHub
* Branch management
* Pull Requests
* Code reviews
* Issue tracking
* Team collaboration
* Real-world project organization

---

## 📄 License

This project is developed for educational and practical internship purposes by the **SFERA IT Academy — Fullstack 1 Team**.

---

### Built with ❤️ by SFERA IT Academy — Fullstack 1 Team
