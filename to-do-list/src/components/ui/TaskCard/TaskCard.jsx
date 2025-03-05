import React from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import './TaskCard.scss';

export default function TaskCard({ task }) {

    const cleanDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    }

  return (
    <div>
        <Box display="flex" justifyContent="center" width="100%">
            <Card className="task-card" sx={{ width: '90%', maxWidth: '600px', margin: '1rem' }}>
                <CardActions id='task-card-checkbox'>
                    <Checkbox checked={task.is_completed}  />
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
                    <Button size="large">
                        <MdModeEditOutline size={25}/>
                    </Button>
                    <Button size="medium">
                        <MdDelete size={25}/>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </div>
  )
}
