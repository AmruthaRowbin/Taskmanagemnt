import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/userapi';

const initialState = {
    user: localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' 
        ? JSON.parse(localStorage.getItem('user')) 
        : null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};
// Async thunk for logging in
export const login = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            console.log(response, "useeeeeeeeeeeeeeeeeeeeeeee"); // Log the entire response

            // Check if response contains the user and token
            if (response.token && response.user) {
                return response; // Return the entire response object with user and token
            } else {
                console.error('No token or user in response:', response);
                return rejectWithValue(response.message || 'Invalid response format'); // Reject with error message
            }
        } catch (error) {
            console.error('Error during login:', error); // Log error details
            return rejectWithValue(error.message);
        }
    }
);


// Async thunk for registering
export const register = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUser(userData);
            return response; // Assuming response contains token and user details
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Assuming response has `user` object
                state.token = action.payload.token; // Assuming response has `token`
                localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user in localStorage
                localStorage.setItem('token', action.payload.token); // Save token in localStorage
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Assuming response has `user` object
                state.token = action.payload.token; // Assuming response has `token`
                localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user in localStorage
                localStorage.setItem('token', action.payload.token); // Save token in localStorage
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
