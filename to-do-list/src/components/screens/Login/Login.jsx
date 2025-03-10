import React from 'react'
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Constant from '-@-/assets/Constant.jsx';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { LuListTodo } from "react-icons/lu";

import { useAuth } from '-@-/components/auth/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState(''); // Estado para el email
  const [error, setError] = useState(''); // Estado para los errores
  const navigate = useNavigate(); // Hook para la navegación
  const { login } = useAuth(); // Función de login del contexto

  /**
   * Función para manejar el inicio de sesión
   */
  const handleLogin = async () => {
    if (!Constant.emailRegex.test(email)) {
      setError('Invalid email');
      return;
    }
  
    try {
      const response = await fetch('/api/to-do/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Server response:', text);
        
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          errorData = { error: 'Invalid response from server' };
        }
        setError(errorData.error || 'An error occurred');
        return;
      }
  
      const data = await response.json();
      const token = data.data.token;
      
      login(token, email);
      navigate('/tasks');
    } catch (error) {
      console.error('Full error details:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div id='login-container'
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '92%',
      padding: '15px'
    }}>
      <Box sx={{ 
          minWidth: 50, 
          width: 500
        }} id='login-box'>
        <Card variant="outlined" style={{ padding: 20 }}>
          <CardContent style={{ textAlign: 'center' }}>
      
            <LuListTodo size={50} />
            <br />
            <br />
            <Typography variant="h5" component="div">
              Welcome to your to-do list
            </Typography>
            <br />
            
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              margin='normal'
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              helperText={error}
            />
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button size="medium" variant="outlined" onClick={handleLogin}>Login</Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}
