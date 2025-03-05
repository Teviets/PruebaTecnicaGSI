import React, { useEffect, useState }  from 'react'

import './Header.scss'

import Button from '@mui/material/Button';

import { IoMdAdd } from "react-icons/io";

export default function Header() {

    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }
    , [email]);

  return (
    <div id='header'>
        <h3> {email} </h3>
        <h1>Task Manager</h1>
        <Button>
            <IoMdAdd size={25}/>
        </Button>

        
    </div>
  )
}
