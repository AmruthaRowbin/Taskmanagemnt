import axiosInstance from '../utils/axiosInstance'; // Import the axiosInstance with interceptor

// Create a new task
export const createTask = async (taskData) => {
    console.log(taskData, "Creating task with the following data:");

    try {
        // Make the API call to create a new task
        const response = await axiosInstance.post('/task', taskData);
        console.log('Task created successfully:', response.data);
        return { success: true, data: response.data }; // Return the response data
    } catch (error) {
        console.error('Error while creating task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Fetch tasks by user ID
export const getTasks = async (userId) => {
    try {
        console.log(userId, "User ID passed to API");  // Ensure the userId is logged correctly
        const response = await axiosInstance.get(`/task/${userId}`); // Use the userId value in the URL
        return { success: true, data: response.data }; // Return the tasks data
    } catch (error) {
        console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Delete a task by task ID
export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/task/${taskId}`);
        console.log('Task deleted successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error deleting task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};

// Update a task by task ID
export const updateTask = async (taskId, updatedTaskData) => {
    console.log(taskId, updatedTaskData, "Updating task");
    
    try {
        const response = await axiosInstance.put(`/task/${taskId}`, updatedTaskData);
        console.log('Task updated successfully:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error updating task:', error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : error.message };
    }
};