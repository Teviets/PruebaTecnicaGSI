import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import TaskCard from '../../ui/TaskCard/TaskCard';
import Header from '../../ui/Header/Header';
import Pagination from '@mui/material/Pagination';
import Filters from '../../ui/Filters/Filters'; // Importa el componente Filters
import './Todo.scss';

export default function Todo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const [page, setPage] = useState(1); // Estado para la página actual
  const [orderBy, setOrderBy] = useState('created_at'); // Estado para el campo de ordenamiento
  const [orderDirection, setOrderDirection] = useState('asc'); // Estado para la dirección del ordenamiento

  const fetchTasks = (page = 1, orderBy = 'created_at', orderDirection = 'asc') => {
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    // Construye la URL con los parámetros de filtrado
    const apiUrl = `/api/to-do/tasks?limit=4&order=${orderDirection === 'asc' ? '' : '-'}${orderBy}&page=${page}`;

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
    fetchTasks(page, orderBy, orderDirection); // Llama a fetchTasks con los filtros actuales
  }, [token, page, orderBy, orderDirection]); // Se ejecuta cuando cambian los filtros

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
        fetchTasks(page, orderBy, orderDirection); // Recarga las tareas después de eliminar
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Cambia a la nueva página
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value); // Actualiza el campo de ordenamiento
  };

  const handleOrderDirectionChange = (event) => {
    setOrderDirection(event.target.value); // Actualiza la dirección del ordenamiento
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id='task-list-container'>
      <Header onTaskAdded={() => fetchTasks(page, orderBy, orderDirection)} />
      
      {/* Usa el componente Filters */}
      <Filters
        orderBy={orderBy}
        orderDirection={orderDirection}
        onOrderByChange={handleOrderByChange}
        onOrderDirectionChange={handleOrderDirectionChange}
      />

      <div id='task-list-content'>
        {data && data.data && data.data.map(task => (
          <TaskCard key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
        ))}
      </div>

      <div id='pagination-controls'>
        <Pagination
          count={data?.meta?.pages || 1} // Número total de páginas
          page={page} // Página actual
          onChange={handlePageChange} // Maneja el cambio de página
          color="secondary"
        />
      </div>
    </div>
  );
}