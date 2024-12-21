import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from '../components/user/users';
import App from '../pages/Home';


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/users" element={<Users/>} />
            </Routes>
        </Router>
    );
}

export default AppRouter222;