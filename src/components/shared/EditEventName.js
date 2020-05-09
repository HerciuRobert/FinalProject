import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';

import '../App.css';

import AuthContext from '../auth/AuthContext';

function EditEventName() {
    const [reservation, setReservation] = useState(null);
    const { auth } = useContext(AuthContext);

    async function getReservationByUserId() {
        try {    
            const res = await axios('/reservations?user_email=' + auth);
            setReservation(res.data);
        } catch(e) {
            console.warn(e);
        }
 
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios('/reservations?user_email=' + auth, {
                method: 'PUT',
                data: qs.stringify({ 'event_name': reservation[0].event_name }),
            });
            console.log(res);
        } catch(e) {
            console.warn(e);
        }
    }

    function handleInputChange(e) {
        setReservation( { ...reservation, event_name: e.currentTarget.value });
    }
    
    useEffect(() => { 
        getReservationByUserId(auth); 
    }, [auth]);

    if(!reservation) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            {/* {reservation.map((list) =>
                <h1 key={`${list.event_name}`}>Edit event name { list.event_name }</h1>)
            } */}

            <h1>Edit Event name</h1>

            <form onSubmit={ handleSubmit }>
                <div className="card">
                    <label htmlFor="edit-event-name">My event</label>
                    <input 
                        onChange={ handleInputChange }
                        type="text"
                        className="card"
                        id="edit-event-name"
                        placeholder="Enter event name"
                    />
                </div>
                <button type="submit" className="button-style">Save</button>
            </form>
        </>
    )
}


export default EditEventName