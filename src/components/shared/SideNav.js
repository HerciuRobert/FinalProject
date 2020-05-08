import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import AuthContext from '../auth/AuthContext';

// import ReserveRestaurant from '../restaurants/ReserveRestaurant';
// import ReserveBand from '../bands/ReserveBand';
// import ReserveOther from '../other/ReserveOther';
import axios from 'axios';


function SideNav() {
    const { auth } = useContext(AuthContext);
    const { userId } = useParams();
    let [users, setUsers] = useState([]);
    let [event, setEvent] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const res = await axios('/users');
        setUsers(res.data);
    }

    async function getEventByUser(id) {
        const reservations = await axios.get('/reservations').then(res=>res.data);
        setEvent(reservations);
    }

    function updateEventName(e) {
        e.preventDefault();
    }

    function handleDeleteRestaurant(e) {
        e.preventDefault();
    //                 method: 'DELETE'
    //             });
    }
  
    return (
        <>
        {(auth ?
        <div className="side-nav-card">
            <article className="side-nav">
                <div>        
                    {event.map((list) =>
                    <h1 onLoad={getEventByUser} key={`${list.event_name}`}>{list.event_name}</h1>)
                    
                    }

                    {(event.user_email == auth ?
                        <button className="button-style" onClick={updateEventName}>Edit event name</button>
                        :
                        null
                    )}
                    
                    <h4>Restaurant: restaurant.name</h4>
                    <p>Restaurant expenses: restaurant.price</p>
                    
                    <label htmlFor="participant-number">Number of participants:</label> <input type="number" id="participant-number" className="label" placeholder="0"/>
                    {(auth && event.user_email == auth ?
                            <div>
                            <a href="/proceed-to-checkout" className="button-style" onClick={handleDeleteRestaurant}>Delete restaurant</a>
                        </div>
                        :
                        null
                    )}

                    <h4>Band: band.name</h4>
                    <p>Band expenses: restaurant.price</p>
                    {(event.user_email == auth ?
                        <div>
                            <a href="/proceed-to-checkout" className="button-style">Delete band</a>
                        </div>
                        :
                        null
                    )}
                    <h3>Activity</h3>
                    <p>Activity expenses: other.price</p>
                    {(event.user_email == auth ?
                        <div>
                            <a href="/proceed-to-checkout" className="button-style">Delete activity</a>
                        </div>
                        :
                        null
                    )}
                    
                    <p><strong>Total expenses: (restaurant.price*{"participant-number".value})+band.price+other.price</strong></p>
                </div>
            </article> 
        </div>
        :
        null
        )}
        </>
    );
    
}

export default SideNav;