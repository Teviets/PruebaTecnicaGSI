import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm({  isEdit, taskId, onTaskModified = () => {} }) { // Valor por defecto para onTaskModified
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setOpen(false);
    };

    const fetchTaskByID = () => {
        if (!localStorage.getItem('token')) {
          setError('No token found');
          setLoading(false);
          return;
        }
      
        const apiUrl = `/api/to-do/tasks/${taskId}`;
      
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
            console.log('Datos de la tarea:', data); // Verifica la estructura de la respuesta
            setTitle(data.data.task.title); // Accede a data.task.title
            setDescription(data.data.task.description); // Accede a data.task.description
          })
          .catch(error => {
            console.error('Error:', error);
          });
    };

    const handleAddTask = () => {
        const body = { 
            user_email: localStorage.getItem('email'), 
            title: title, 
            description: description 
        };
        fetch('/api/to-do/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            handleClose();
            onTaskModified(); // Llama a la función onTaskModified para actualizar la lista de tareas
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleEditTask = () => {
        fetch(`/api/to-do/tasks/update/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            console.log('Respuesta:', response);
            return response.json();
        })
        .then(data => {
            handleClose();
            onTaskModified(); // Llama a la función onTaskModified para actualizar la lista de tareas
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if (isEdit && open && taskId) { // Asegúrate de que taskId tenga un valor
           fetchTaskByID();
        }
    }, [isEdit, taskId, open]);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button onClick={handleClickOpen} height={'100%'} >
            { isEdit ? <MdModeEditOutline size={25}/> : <IoMdAdd size={25} /> }
        </Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            disableEnforceFocus={true}
        >
            <DialogTitle>{"Add Task"}</DialogTitle>
            <DialogContent>
            <DialogContentText component={'div'}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Task title"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    value={description}
                    fullWidth
                    multiline
                    minRows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleAddTask}>
                    <IoMdAdd size={20} /> Add
                </Button>
                
            </DialogActions>
        </Dialog>
    </div>
  );
}