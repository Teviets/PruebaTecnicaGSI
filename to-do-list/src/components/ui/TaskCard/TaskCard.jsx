import React, { useState  } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { MdDelete } from "react-icons/md";

import './TaskCard.scss';

export default function TaskCard({ task, onTaskModified, onTaskDeleted }) {
    const [isCompleted, setIsCompleted] = useState(task.is_completed); // Estado local del checkbox de la tarea

    /**
     * Convierte una fecha a un formato legible.
     * 
     * @param {string | number | Date} date - Fecha en formato ISO, timestamp o Date.
     * @returns {string} Fecha en el formato "Month Day, Year Hour:Minutes:Seconds".
     */
    const cleanDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    };

    /**
     * Cambia el estado de completado de una tarea y lo actualiza en el servidor.
     * 
     * @param {string} taskId - ID de la tarea que se va a actualizar.
     */
    const handleEditTask = (taskId) => {
        const newCompletedState = !isCompleted;

        fetch(`/api/to-do/tasks/update/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ is_completed: newCompletedState }) // Envía el nuevo estado del checkbox
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            setIsCompleted(newCompletedState); // Actualiza el estado local del checkbox
            onTaskModified(); // Llama a la función para actualizar la lista de tareas
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Card className="task-card" sx={{ width: '90%', maxWidth: '600px', margin: '1rem' }}>
                <CardActions id='task-card-checkbox'>
                    <Checkbox 
                        checked={isCompleted} 
                        onChange={() => handleEditTask(task.id)} />
                </CardActions>
                <CardContent className='task-card-content'>
                    { task.updated_at ? 
                    <Typography color="textSecondary" gutterBottom id='task-card-last-update'>
                        Last update: {cleanDate(task.updated_at)}
                    </Typography>
                     : 
                    <Typography color="textSecondary" gutterBottom id='task-card-last-update'>
                        Last update: {cleanDate(task.created_at)}
                    </Typography>
                    }
                    
                    <Typography variant="h5" component="h2">
                        # {task.id} | {task.title}
                    </Typography>
                    <Typography variant="body2" component="p" className='task-card-description'>
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions className='task-card-actions'>
                    <Button size="medium" onClick={onTaskDeleted}>
                        <MdDelete size={25}/>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
