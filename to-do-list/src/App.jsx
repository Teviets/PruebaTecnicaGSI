import { useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './assets/Theme/Theme.jsx';
import { Route, Routes } from 'react-router-dom';
import Login from './components/screens/Login/Login.jsx';
import Todo from './components/screens/Todo/Todo.jsx';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Todo />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;