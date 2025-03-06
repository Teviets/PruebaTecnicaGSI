import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import TaskCard from '../../ui/TaskCard/TaskCard';
import Header from '../../ui/Header/Header';
import DialogForm from '../../ui/DialogForm/DialogForm.jsx'; // Importa el componente DialogForm
import './Todo.scss';

export default function Todo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchTasks = () => {
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    const apiUrl = '/api/to-do/tasks?limit=20&order=is_completed&page=1';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [token]); // Asegúrate de que se ejecute cuando el token cambie

  const handleDeleteTask = (taskId) => {
    fetch(`/api/to-do/tasks/delete/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(() => {
        setData(prevData => ({
          ...prevData,
          data: prevData.data.filter(task => task.id !== taskId)
        }));
        fetchTasks();
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id='task-list-container'>
      <Header onTaskAdded={fetchTasks} />
      <div id='task-list-content'>
        {data && data.data && data.data.map(task => ( // Verifica que data y data.data existan
          <TaskCard key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
        ))}
      </div>
    </div>
  );
}