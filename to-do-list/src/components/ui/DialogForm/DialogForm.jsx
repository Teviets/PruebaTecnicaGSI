import React, { useState } from 'react';
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

export default function DialogForm({  isEdit, onTaskModified = () => {} }) { // Valor por defecto para onTaskModified
    const [open, setOpen] = useState(false); // Estado para controlar si el diálogo está abierto o cerrado
    const [title, setTitle] = useState(''); // Estado para almacenar el título de la tarea
    const [error, setError] = useState(''); // Estado para almacenar el mensaje de error
    const [description, setDescription] = useState(''); // Estado para almacenar la descripción de la tarea

    /**
     * @returns {boolean} Retorna true si el formulario es válido, de lo contrario retorna false
     */
    const validateForm = () => {
        if (!title) {
            setError('Title and description are required');
            return false;
        }
        return true;
    }

    /**
     * Abre el diálogo
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * Cierra el dialogo y limpia los campos
     */
    const handleClose = () => {
        setTitle('');
        setDescription('');
        setOpen(false);
    };

    /**
     * @returns {void} Crea una nueva tarea
     */
    const handleAddTask = () => {
        if (!validateForm()) {
            return;
        }
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
                    {...error && { error: true, helperText: error }}
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