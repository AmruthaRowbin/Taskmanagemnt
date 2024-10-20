import React, { useEffect, useState } from 'react';
import {
    Container,
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Typography,
} from '@mui/material';
import TaskUpdateForm from './TaskUpdateForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, removeTask, editTask } from '../redux/slices/taskSlice'; // Adjust path as necessary
import { useParams } from 'react-router-dom';

const TaskList = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks); // Accessing tasks from Redux state
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); 
    
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (userId) {
            dispatch(fetchTasks(userId)); // Fetch tasks using Redux
        }
    }, [userId, dispatch]);

    const handleEditTask = (updatedTask) => {
        dispatch(editTask({ taskId: updatedTask._id, updatedTaskData: updatedTask })).then((result) => {
            if (editTask.fulfilled.match(result)) {
                dispatch(fetchTasks(userId)); // Re-fetch tasks after edit
            } else {
                console.error('Failed to update task');
            }
        });
    };

    const handleDeleteClick = async (id) => {
        const result = await dispatch(removeTask(id)); // Dispatch removeTask action
        if (removeTask.fulfilled.match(result)) {
            console.log('Task deleted successfully');
        } else {
            console.error('Failed to delete the task');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTask(null);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
        const matchesStatus = statusFilter ? task.status === statusFilter : true;
        return matchesPriority && matchesStatus;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        const dueDateA = new Date(a.dueDate);
        const dueDateB = new Date(b.dueDate);
        return sortOrder === 'asc' ? dueDateA - dueDateB : dueDateB - dueDateA;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'error';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'success';
            default:
                return 'default';
        }
    };

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <FormControl sx={{ mr: 2, minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            label="Priority"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ mr: 2, minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            label="Status"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort Order</InputLabel>
                        <Select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            label="Sort Order"
                        >
                            <MenuItem value="asc">Due Date Ascending</MenuItem>
                            <MenuItem value="desc">Due Date Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {loading ? (
                <Typography variant="h6" color="text.secondary" align="center">
                    Loading tasks...
                </Typography>
            ) : tasks.length === 0 ? (
                <Typography variant="h6" color="text.secondary" align="center">
                    No tasks available. Create your first task!
                </Typography>
            ) : (
                <List>
                    {sortedTasks.map((task) => task && task._id &&(
                        <ListItem key={task._id} sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemText
                                primary={
                                    <span>
                                        <Chip
                                            label={task.priority}
                                            color={getPriorityColor(task.priority)}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                        {task.title}
                                    </span>
                                }
                                secondary={`Due: ${task.dueDate ? task.dueDate.split('T')[0] : 'No due date'} - Status: ${task.status} - Reminder: ${task.reminder ? task.reminder.split('T')[0] : 'None'}`}
                            />
                            <Button variant="outlined" onClick={() => handleEditClick(task)}>Edit</Button>
                            <Button variant="outlined" color="error" onClick={() => handleDeleteClick(task._id)}>Delete</Button>
                        </ListItem>
                    ))}
                </List>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {selectedTask && <TaskUpdateForm task={selectedTask} onClose={handleClose} onTaskUpdate={handleEditTask} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskList;
