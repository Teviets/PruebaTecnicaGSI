import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import TaskCard from '../../ui/TaskCard/TaskCard';
import Header from '../../ui/Header/Header';
import Pagination from '@mui/material/Pagination';
import Filters from '../../ui/Filters/Filters'; // Importa el componente Filters
import CircularProgress from '@mui/material/CircularProgress';
import './Todo.scss';

export default function Todo() {
  const [data, setData] = useState(null); // Estado para los datos de las tareas
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para los errores
  const { token } = useAuth(); // Obtiene el token del contexto
  const [page, setPage] = useState(1); // Estado para la página actual
  const [orderBy, setOrderBy] = useState('created_at'); // Estado para el campo de ordenamiento
  const [orderDirection, setOrderDirection] = useState('asc'); // Estado para la dirección del ordenamiento

  /**
   * Función para obtener las tareas de la API
   * @param {number} page - Página actual
   * @param {string} orderBy - Campo de ordenamiento
   * @param {string} orderDirection - Dirección del ordenamiento
   */
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

  /**
   * Efecto para obtener las tareas al cargar el componente
   */
  useEffect(() => {
    fetchTasks(page, orderBy, orderDirection); // Llama a fetchTasks con los filtros actuales
  }, [token, page, orderBy, orderDirection]); // Se ejecuta cuando cambian los filtros

  /**
   * Función para eliminar una tarea
   * @param {number} taskId - ID de la tarea a eliminar
   */
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

  /**
   * Función para manejar el cambio de página
   * @param {object} event - Evento del cambio de página
   * @param {number} newPage - Nueva página
   */
  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Cambia a la nueva página
  };

  /**
   * Función para manejar el cambio de campo de ordenamiento
   * @param {object} event - Evento del cambio de campo de ordenamiento
   */
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value); // Actualiza el campo de ordenamiento
  };

  /**
   * Función para manejar el cambio de dirección de ordenamiento
   * @param {object} event - Evento del cambio de dirección de ordenamiento
   */
  const handleOrderDirectionChange = (event) => {
    setOrderDirection(event.target.value); // Actualiza la dirección del ordenamiento
  };

  if (loading) {
    return <CircularProgress />;
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
          <TaskCard 
            key={task.id} 
            task={task} 
            onTaskModified={fetchTasks} // Solo recarga la lista cuando se modifica
            onTaskDeleted={() => handleDeleteTask(task.id)} // Maneja la eliminación
          />
        
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