import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.tsx';
import SignIn from '../pages/SignIn.tsx';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;