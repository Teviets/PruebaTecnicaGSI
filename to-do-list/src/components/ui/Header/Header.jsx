import React from 'react'
import './Header.scss'
import DialogForm from '../DialogForm/DialogForm.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';

export default function Header({ onTaskAdded = () => {} }) {
  // Obtén el email desde el contexto de autenticación
  const { email } = useAuth();

  return (
    <div id='header'>
        <h3> {email} </h3>
        <h1>Task Manager</h1>
        <DialogForm onTaskModified={onTaskAdded}/>
    </div>
  )
}