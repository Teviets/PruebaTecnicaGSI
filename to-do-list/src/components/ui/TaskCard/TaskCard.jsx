import React, { useState  } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import DialogForm from '../DialogForm/DialogForm';

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import './TaskCard.scss';

export default function TaskCard({ task, onTaskModified }) {
    const [isCompleted, setIsCompleted] = useState(task.is_completed);

    const cleanDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    }

    const handleEditTask = (taskId) => {
        const newCompletedState = !isCompleted; // Invierte el estado actual del checkbox
    
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
            onTaskModified(); // Llama a la función onTaskModified para actualizar la lista de tareas
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    
    return (
    <div id='task-list-container'>
        <Box display="flex" justifyContent="center" width="100%">
            <Card className="task-card" sx={{ width: '90%', maxWidth: '600px', margin: '1rem' }}>
                <CardActions id='task-card-checkbox'>
                    <Checkbox 
                        checked={isCompleted} 
                        onChange={() => handleEditTask(task.id)} />
                </CardActions>
                <CardContent className='task-card-content'>
                    { task.updated_at ? 
                    <Typography color="textSecondary" gutterBottom>
                        Last update: {cleanDate(task.updated_at)}
                    </Typography>
                     : 
                    <Typography color="textSecondary" gutterBottom>
                        Last update: {cleanDate(task.created_at)}
                    </Typography>
                    }
                    
                    <Typography variant="h5" component="h2">
                        {task.title}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="p">
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions className='task-card-actions'>
                    <Button size="medium" onClick={onTaskModified}>
                        <MdDelete size={25}/>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </div>
  )
}
