
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

    let [reservedRestaurant, setReservedRestaurant] = useState([]);


    useEffect(() => {
        getRestaurantReservationByUserId(auth);
    }, [auth]);

    async function getRestaurantReservationByUserId(id) {
        const reservation = await axios.get('/reservations/?user_email=' + auth).then(res => res.data);
        console.log(reservation)
        setReservedRestaurant(reservation);
    }

    function updateEventName() {
        const res = axios('/reservations/' + reservedRestaurant[0].id, {
            method: 'PATCH',
            data: {
                'event_name': getNewName(),
            },
        })
        window.location.reload();
    }

    function getNewName() {
        return document.getElementById('edit-name').value;
    }

    async function handleDelete(e) {
        await axios.delete('/reservations/' + reservedRestaurant[0].id)
        window.location.reload();
    }

    function calculatePrice(){
       let participants =  document.getElementById('participant-number').value;
       let totalRestaurant = participants * reservedRestaurant[0].restaurantPrice;
       let total = totalRestaurant + reservedRestaurant[0].bandPrice + reservedRestaurant[0].otherPrice;
       console.log(total);
       return total;
    }

    return (
        <>
            {(auth ?
                <div className="side-nav-card">
                    <article className="side-nav">
                        <div>
                            {reservedRestaurant.map((list) =>
                                <h1 onLoad={getRestaurantReservationByUserId} key={`${list.event_name}`}>{list.event_name}</h1>)

                            }

                            {(reservedRestaurant.length && auth ?
                                <input
                                    type="text"
                                    id="edit-name"
                                    className="label"
                                /> : null)}
                            {(reservedRestaurant.length && auth ?
                                <a href className="button-style" onClick={updateEventName}>Edit event name</a>
                                :
                                null
                            )}

                            <h4>Restaurant:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.restaurantName}`}>{list.restaurantName}</h4>)

                            }
                            </h4>

                            <p>Restaurant expenses:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.restaurantPrice}`}>{list.restaurantPrice}</h4>)

                            }
                            </p>

                            <label htmlFor="participant-number">Number of participants:</label> <input type="number" id="participant-number" className="label" placeholder="1" min="1" defaultValue="1"/>

                            <h4>Band:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.bandName}`}>{list.bandName}</h4>)

                            }
                            </h4>

                            <p>Band expenses:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.bandPrice}`}>{list.bandPrice}</h4>)

                            }
                            </p>
                            <h4>Activity:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.otherName}`}>{list.otherName}</h4>)

                            }
                            </h4>

                            <p>Activity expenses:         {reservedRestaurant.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.otherPrice}`}>{list.otherPrice}</h4>)

                            }
                            </p>

                            {(reservedRestaurant.length && auth ?
                                <a href className="button-style" onClick={calculatePrice}>Calculate price</a>
                                :
                                null
                            )}
                            <p><strong>Total expenses: {calculatePrice}</strong></p>
                            {(reservedRestaurant.length && auth ?
                                <div>
                                    <a className="button-style" onClick={handleDelete}>Delete event</a>
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