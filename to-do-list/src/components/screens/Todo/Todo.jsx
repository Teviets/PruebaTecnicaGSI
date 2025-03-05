import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext';

import TaskCard from '../../ui/TaskCard/TaskCard';
import Header from '../../ui/Header/Header';

import './Todo.scss';

export default function Todo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

      // URL de la API que deseas consultar
      const apiUrl = '/api/to-do/tasks?limit=20&order=is_completed&page=1';
  
      // Realizar el fetch
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Enviar el token en la cabecera
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then(data => {
          setData(data); // Guardar los datos en el estado
          setLoading(false); // Indicar que la carga ha terminado
        })
        .catch(error => {
          setError(error.message); // Guardar el error en el estado
          setLoading(false); // Indicar que la carga ha terminado
        });
    }, []); // El array vacío asegura que esto se ejecute solo una vez
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div id='task-list-container'>
      <Header />
      <div id='task-list-content'>
      {data.data.map(task => (
        <TaskCard task={task} />
      ))}
      </div>
      
    </div>
  )
}
