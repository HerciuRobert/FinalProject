import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './shared/Header';
import RestaurantList from './restaurants/RestaurantList';
import RestaurantDetails from './restaurants/RestaurantDetails';
import ReserveRestaurant from './restaurants/ReserveRestaurant';
import BandList from './bands/BandList';
import BandDetails from './bands/BandDetails';
import ReserveBand from './bands/ReserveBand';
import OtherList from './other/OtherList';
import OtherDetails from './other/OtherDetails';
import ReserveOther from './other/ReserveOther';
import SideNav from './shared/SideNav';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import { apiUrl } from '../config';

import './App.css';

axios.defaults.baseURL = apiUrl;


function App() {
    const [auth, setAuth] = useState(null);
    //verific daca are in local storage token daca e facem set tokem cu ce vine din storage
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setAuth(auth);
        }


        axios.defaults.headers.common['x-auth-token'] = auth || '';
    }, []);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <BrowserRouter>
                <Header />
                <div className="main-style">
                    <SideNav />
                    <Route exact path="/">
                        <div>
                            <div>
                                <RestaurantList />
                            </div>
                            <div>
                                <BandList />
                            </div>
                            <div>
                                <OtherList />
                            </div>
                        </div>

                    </Route>
                    <Route exact path="/restaurants/:restaurantId">
                        <RestaurantDetails />
                    </Route>
                    <Route exact path="/bands/:bandId">
                        <BandDetails />
                    </Route>
                    <Route exact path="/other/:otherId">
                        <OtherDetails />
                    </Route>
                </div>
                <PrivateRoute exact path="/restaurants/reserve/:restaurantId/">
                    <ReserveRestaurant />
                </PrivateRoute>
                <PrivateRoute exact path="/bands/reserve/:bandId/">
                    <ReserveBand />
                </PrivateRoute>
                <PrivateRoute exact path="/other/reserve/:otherId/">
                    <ReserveOther />
                </PrivateRoute>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


export default App;