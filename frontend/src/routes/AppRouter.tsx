import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/WorkSpace';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPassword from "../pages/ForgetPassword";
import FrontPage from "../pages/FrontPage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/workspace" element={<Home/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/forgot-password" element={<ForgetPassword/>}/>
                <Route path="/" element={<FrontPage/>}></Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;