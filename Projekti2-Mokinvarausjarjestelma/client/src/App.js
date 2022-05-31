import { useEffect, useState } from 'react';
import Navbar from './components/admin/menu';
import Locations from './components/admin/locations';
import Cottages from './components/admin/cottage';
import Activities from './components/admin/activities';
import Customers from './components/admin/customers';
import Reservation from './components/admin/reservation';
import Login from './components/login';
import Home from './components/admin/home';
import CustomersReservation from './components/admin/customersreservation';
import { Grid } from '@material-ui/core';
import { NavLink, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservations from './components/admin/reservations';


const App = () => {

    return (

        <Router>
            <Navbar />
            <Routes>
            <Route path='/' element={<Home/>} />
                <Route path='/locations' element={<Locations/>} />
                <Route path='/cottages' element={<Cottages/>} />
                <Route path='/activities' element={<Activities/>} />
                <Route path='/customers' element={<Customers/>} />
                <Route path='/reservation' element={<Reservation/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/myreservation' element={<CustomersReservation/>}    />
                <Route path='/reservations' element={<Reservations/>} />    

            </Routes>
        </Router>
    )
}

export default App;
