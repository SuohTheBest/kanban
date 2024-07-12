import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.tsx';
import SignIn from '../pages/SignIn.tsx';
import SignUp from '../pages/SignUp.tsx';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/workspace" element={<Home/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;