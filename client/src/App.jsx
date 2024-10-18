import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbarr';
import TaskCreationPage from './pages/TaskCreationPage';
import TaskList from './components/TaskList';
import { UserProvider } from './context/UserContext';


function App() {

    return (
        <UserProvider>
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/tasks" element={<TaskList />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/task" element={<TaskCreationPage/>}/>
                <Route path="/task/:userId" element={<TaskList/>}/>
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
