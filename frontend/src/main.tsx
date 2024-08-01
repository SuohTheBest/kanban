import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios'
import AppRouter from './routes/AppRouter';

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppRouter/>
    </React.StrictMode>,
)
