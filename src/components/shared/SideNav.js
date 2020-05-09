import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';

import '../App.css';


function SideNav() {
    const { auth } = useContext(AuthContext);

    let [reservedRestaurant, setReservedRestaurant] = useState([]);
    // const [participantsNumber, setParticipantsNumber] = useState('');

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };



    async function getRestaurantReservationByUserId(id) {
        const reservation = await axios.get('/reservations/?user_email=' + auth).then(res => res.data);
        console.log(reservation)
        setReservedRestaurant(reservation);
        history.replace(from);

    }

    useEffect(() => {
        getRestaurantReservationByUserId(auth);
    }, [auth]);

    async function handleDeleteEvent(e) {
     await axios.delete('/reservations/' + reservedRestaurant[0].id )
     window.location.reload();
    }

    return (
        <>
            {(auth ?
                <div className="side-nav-card">
                    <article className="side-nav">
                        <div>
                            {reservedRestaurant.map((list) =>
                                <h1 onChange={getRestaurantReservationByUserId} key={`${list.event_name}`}>{list.event_name} </h1>)

                            }

                            {(reservedRestaurant.length && auth ?
                                <Link className="button-style" to={"/edit-event-name"}>Edit event name</Link>
                                :
                                null
                            )}

                            {reservedRestaurant.map((list) =>
                                <h4 onChange={getRestaurantReservationByUserId} key={`${list.date}`}>Save the date: {list.date} </h4>)

                            }

                            <h4>Restaurant:         {reservedRestaurant.map((list) =>
                                <div onChange={getRestaurantReservationByUserId} key={`${list.restaurantName}`}>{list.restaurantName}</div>)

                            }
                            </h4>

                            {reservedRestaurant.map((list)  =>
                                <h4 onChange={getRestaurantReservationByUserId} key={`${list.restaurantPrice}`}>Restaurant expenses: {list.restaurantPrice} &euro;</h4>)

                            }

                            <label htmlFor="participant-number">Number of participants:</label> 
                            <input 
                                type="number" 
                                id="participant-number" 
                                className="label" 
                                placeholder="1" 
                                min="1"
                                value="1"
                            />

                            <h4>Band: band.name</h4>
                            <p>Band expenses: restaurant.price</p>
                            <h4>Activity:</h4>
                            <p>Activity expenses: other.price</p>
                            {reservedRestaurant.map((list) =>
                                <h4 onChange={getRestaurantReservationByUserId} key={`${list.restaurantPrice}`}>Total expenses: {list.restaurantPrice}</h4>)
                            }
                            {(reservedRestaurant.length && auth ?
                                <div>
                                    <a className="button-style" onClick={handleDeleteEvent}>Delete event</a>
                                </div>
                                :
                                null
                            )}
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