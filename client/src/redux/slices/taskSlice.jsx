import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTask, getTasks, deleteTask, updateTask } from '../../api/taskApi';

// Initial state
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Async thunk for creating a task
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await createTask(taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getTasks(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for deleting a task
export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await deleteTask(taskId);  // Assuming deleteTask returns a success response
            return { _id: taskId };  // Return the taskId to remove it from the state
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);
// Async thunk for updating a task
export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ taskId, updatedTaskData }, { rejectWithValue }) => {
        try {
            const response = await updateTask(taskId, updatedTaskData);
            console.log(response,"tasksliceeeeeeeeeee")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.loading = false;
            
                // Ensure the action payload contains the necessary ID
                if (!action.payload || !action.payload._id) {
                    console.error("Task ID is missing in the response:", action.payload);
                    return;
                }
            
                // Remove the task from the state by filtering out the deleted task's ID
                state.tasks = state.tasks.filter(task => task._id !== action.payload._id);
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.loading = false;
            
                // Check if action.payload exists and has the task field
                if (!action.payload || !action.payload.task) {
                    console.error("Payload or task is missing in the response:", action.payload);
                    return;
                }
            
                const updatedTask = action.payload.task; 
                console.log(updatedTask, "taskkkkkkkkkkkkkkkkkkkkkkkk"); // Access the task inside the payload
            
                const index = state.tasks.findIndex(task => task._id === updatedTask._id);
                console.log(index, "oooooooooooooooooo"); // Use _id to find the task
            
                if (index !== -1) {
                    state.tasks[index] = updatedTask; // Update the task in the state
                }
            })
            
            
            .addCase(editTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;
