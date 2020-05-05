import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';


import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';

function ReserveRestaurant() {
    const { restaurantId } = useParams();
    const { userId } = useParams();
    const [reservations, setReservations] = useState(null);
    const [user, setUser] = useState(null);

    const { auth } = useContext(AuthContext);

    async function getUserById(id) {
        const res= await axios.get('/users?email=' + id);
        setUser(res.data);
}
    async function getRestaurantById(id) {
            const res= await axios('/restaurants/' + id);
            setReservations(res.data);
    }


    async function handleReservation(e) {
        e.preventDefault();
        const res= await axios('/reservations/', {
            method: 'POST',
            data: { 
                'id': '',
                'event_name': '',
                'user_id': userId,
                'restaurant_id': restaurantId       
            },
        })
        setReservations(res.data);
        console.log(res.data)
    }

    function handleInputChange(e) {
        setReservations({ ...reservations, value: e.currentTarget.value });
    }

    useEffect(() => {
        getRestaurantById(restaurantId);
    }, [restaurantId]);

    useEffect(() => {
        getUserById(userId);
    }, [userId]);

    if(!reservations) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="register-login-card">
            <form onSubmit={ handleReservation } className="form-control">     
                <div >
                        <h1> {reservations.name }</h1>
                        <label htmlFor="name">Event name: </label>
                        <input 
                            onChange={ handleInputChange } 
                            // value="selectedDate"
                            type="text" 
                            className={ 'input-form' } 
                            id="name" 
                            placeholder= "My event"
                        />
                    <button type="submit" className="auth-button-style" >Reserve</button>
                </div>
            </form>
        </div>
    )
}


export default ReserveRestaurant
