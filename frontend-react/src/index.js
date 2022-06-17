import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import CreateApartment from "./components/CreateApartment";
import ApartmentsTable from "./components/ApartmentsTable";
import Users from "./components/Users";
import CreateHousework from "./components/CreateHousework";
import HouseworkTable from "./components/HouseworkTable";
import Header from "./components/Header";
import {AuthService} from "./services/AuthService";
import LogIn from "./components/LogIn";

const root = ReactDOM.createRoot(document.getElementById('root'));
AuthService.refreshAuth()

root.render(
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/sign-up' element={<Register/>}/>
            <Route path='/sign-in' element={<LogIn/>}/>
            <Route path='/apartment/create' element={<CreateApartment/>}/>
            <Route path='/apartment' element={<ApartmentsTable/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/housework/create' element={<CreateHousework/>}/>
            <Route path='/housework' element={<HouseworkTable/>}/>
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
