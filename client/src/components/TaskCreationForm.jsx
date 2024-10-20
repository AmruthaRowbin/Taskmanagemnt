// src/components/TaskCreationForm.js
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Box,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slices/taskSlice';  // Import the async thunk for task creation

const TaskCreationForm = () => {
    const dispatch = useDispatch();

    // Access task creation state from Redux
    const { loading, error, tasks } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [category, setCategory] = useState('Work');
    const [completed, setCompleted] = useState(false);

    // Effect to reset form after task creation
    useEffect(() => {
        if (!loading && !error) {
            setTitle('');
            setDescription('');
            setPriority('Low');
            setDueDate('');
            setStatus('Pending');
            setCategory('Work');
            setCompleted(false);
        }
    }, [tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            priority,
            dueDate,
            status,
            category,
            completed,
        };

        // Dispatch the async thunk to create a new task
        dispatch(addTask(newTask));
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 5,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Create Task
                </Typography>

                {loading && (
                    <Typography color="blue" sx={{ mb: 2 }}>
                        Creating task...
                    </Typography>
                )}
                {error && (
                    <Typography color="red" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Task Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={4}
                />

                <FormControl fullWidth required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        label="Priority"
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Due Date"
                    variant="outlined"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Urgent">Urgent</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Completed</InputLabel>
                    <Select
                        value={completed ? 'Yes' : 'No'}
                        onChange={(e) => setCompleted(e.target.value === 'Yes')}
                        label="Completed"
                    >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Create Task
                </Button>
            </Box>
        </Container>
    );
};

export default TaskCreationForm;
