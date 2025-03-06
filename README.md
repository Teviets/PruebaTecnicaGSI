# Task Management Project - React

This is a task management project developed in React with Material UI. It allows users to create, edit, complete, and delete tasks from a list.

## 🚀 Features
- Create new tasks with title and description.
- Edit existing tasks.
- Mark tasks as completed.
- Delete tasks.
- Data persistence through an API.

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Teviets/PruebaTecnicaGSI
   cd to-do-list
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application in development mode:
   ```sh
   npm run dev
   ```
4. Open in the browser: `http://localhost:5173/`

## 🛠️ Technologies Used
- **Vite** - Project configuration
- **React** - Frontend development framework.
- **Material UI** - UI components library.
- **React Icons** - Custom icons.
- **Fetch API** - Backend communication.

## 📂 Project Structure
```
📦 to-do-list
├── 📂 src
│   ├── 📂 assets
│   │   ├── 📂 Colors
│   │   │   └── _colors.scss
│   │   ├── Constant.jsx
│   │   └── 📂 Theme
│   │       └── Theme.jsx
│   ├── 📂 components
│   │   ├── 📂 auth
│   │   │   └── AuthContext.jsx
│   │   ├── 📂 screens
│   │   │   ├── 📂 Login
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.scss
│   │   │   └── 📂 Todo
│   │   │       ├── Todo.jsx
│   │   │       └── Todo.scss
│   │   └── 📂 ui
│   │       ├── 📂 DialogForm
│   │       │   └── DialogForm.jsx
│   │       ├── 📂 Filters
│   │       │   └── Filters.jsx
│   │       ├── 📂 Header
│   │       │   ├── Header.jsx
│   │       │   └── Header.scss
│   │       └── 📂 TaskCard
│   │           ├── TaskCard.jsx
│   │           └── TaskCard.scss
│   ├── App.jsx
|   ├── App.css
|   ├── index.css
│   ├── main.jsx
├── 📄 package.json
```

## 🔧 Configuration
- **Backend**: The application connects to an API at `/api/to-do/tasks`. Make sure the backend is running and properly configured.
- **Authentication**: A `Bearer Token` stored in `localStorage` is used.

## 📌 Useful Commands
- Run in development mode:
  ```sh
  npm run dev
  ```
- Build for production:
  ```sh
  npm run build
  ```
- Run tests:
  ```sh
  npm test
  ```

## 📞 Contact

Email: sestradat.37@gmail.com  
Phone: +502 41669282
```

Let me know if you need any modifications! 🚀
