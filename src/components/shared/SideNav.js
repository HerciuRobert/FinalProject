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

    function updateEventName(newName) {
        const res =  axios('/reservations/' + reservedRestaurant[0].id, {
            method: 'PATCH',
            data: {
                'event_name':newName,
            },
        })
    }

    async function handleDeleteRestaurant(e) {
     await axios.delete('/reservations/' + reservedRestaurant[0].id )
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
                                <button className="button-style" onClick={updateEventName}>Edit event name</button>
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

                            <label htmlFor="participant-number">Number of participants:</label> <input type="number" id="participant-number" className="label" placeholder="1" min="1"/>
                            {(reservedRestaurant.length && auth ?
                                <div>
                                    <a className="button-style" onClick={handleDeleteRestaurant}>Delete restaurant</a>
                                </div>
                                :
                                null
                            )}

                            <h4>Band: band.name</h4>
                            <p>Band expenses: restaurant.price</p>
                            {(reservedRestaurant.user_email == auth ?
                                <div>
                                    <a href="/proceed-to-checkout" className="button-style">Delete band</a>
                                </div>
                                :
                                null
                            )}
                            <h3>Activity</h3>
                            <p>Activity expenses: other.price</p>
                            {(reservedRestaurant.user_email == auth ?
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