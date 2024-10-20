import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'; // Make sure the component name is correct

import TaskList from './components/TaskList';
import TaskCreation from './pages/TaskCreation';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/task" element={<TaskCreation  />} />
                <Route path="/task/:userId" element={<TaskList />} />
            </Routes>
        </Router>
    );
}

export default App;
