import React from 'react'
import './Header.scss'
import DialogForm from '../DialogForm/DialogForm.jsx';
import { Button } from '@mui/material';
import { useAuth } from '../../auth/AuthContext.jsx';
import { CiLogout } from "react-icons/ci";

export default function Header({ onTaskAdded = () => {} }) {
  // Obtén el email desde el contexto de autenticación
  const { email } = useAuth();

  return (
    <div id='header'>
        <h3> {email} </h3>
        <h1>Task Manager</h1>
        <div className='header__buttons'>
          <DialogForm onTaskModified={onTaskAdded}/>
          <Button onClick={() => {window.location.href = '/'}}>
            <CiLogout size={25} />
          </Button>
        </div>

    </div>
  )
}