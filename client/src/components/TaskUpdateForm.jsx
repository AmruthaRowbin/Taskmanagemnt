import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/slices/taskSlice'; // Adjust the path to where your slice is located

const TaskUpdateForm = ({ task, onClose, onTaskUpdate }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : ''); // Check for null
    const [status, setStatus] = useState(task.status);
    const [category, setCategory] = useState(task.category);
    const [completed, setCompleted] = useState(task.completed);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedTask = {
                title,
                description,
                priority,
                dueDate,
                status,
                category,
                completed,
            };

            onTaskUpdate(updatedTask); // Call the callback with the updated task
            // Dispatch the editTask action with the task ID and updated task data
            dispatch(editTask({ taskId: task._id, updatedTaskData: updatedTask }));

            setOpenSnackbar(true); // Show Snackbar on successful update

            setTimeout(() => {
                onClose(); // Close dialog after a slight delay
            }, 1000); // Delay the form closure to show Snackbar for a moment
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false); // Close Snackbar
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Task Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth required sx={{ mb: 2 }}>
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
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth required sx={{ mb: 2 }}>
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
                <FormControl fullWidth required sx={{ mb: 2 }}>
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
                <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel>Completed</InputLabel>
                    <Select
                        value={completed ? "Yes" : "No"}
                        onChange={(e) => setCompleted(e.target.value === "Yes")}
                        label="Completed"
                    >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Task
                </Button>
            </Box>

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    Task updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default TaskUpdateForm;
