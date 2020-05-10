
import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import AuthContext from '../auth/AuthContext';

import axios from 'axios';


function SideNav() {
    const { auth } = useContext(AuthContext);

    let [reservation, setReservedRestaurant] = useState([]);
    const [total, setTotal] = useState('');


    useEffect(() => {
        getRestaurantReservationByUserId(auth);
    }, [auth]);

    async function getRestaurantReservationByUserId(id) {
        const reservation = await axios.get('/reservations/?user_email=' + auth).then(res => res.data);
        console.log(reservation)
        setReservedRestaurant(reservation);
    }

    function updateEventName() {
        const res = axios('/reservations/' + reservation[0].id, {
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
        await axios.delete('/reservations/' + reservation[0].id)
        window.location.reload();
    }

    function calculatePrice(){
       let participants =  document.getElementById('participant-number').value;
       let totalRestaurant = participants * reservation[0].restaurantPrice;
       let totalBand = reservation[0].bandPrice;
       let totalOther = reservation[0].otherPrice;
       if(totalBand === undefined) {
           totalBand=0;
       }
       if(totalOther===undefined)
{
    totalOther=0;
}   
setTotal(totalRestaurant + totalBand + totalOther);
       console.log(total);
    }

    return (
        <>
            {(auth ?
                <div className="side-nav-card">
                    <article className="side-nav">
                        <div>
                            {reservation.map((list) =>
                                <h1 onLoad={getRestaurantReservationByUserId} key={`${list.event_name}`}>{list.event_name}</h1>)

                            }

                            {(reservation.length && auth ?
                                <input
                                    type="text"
                                    id="edit-name"
                                    className="label"
                                /> : null)}
                            {(reservation.length && auth ?
                                <a href className="button-style" onClick={updateEventName}>Edit event name</a>
                                :
                                null
                            )}

                            <h4>Restaurant:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.restaurantName}`}>{list.restaurantName}</h4>)

                            }
                            </h4>

                            <p>Restaurant expenses:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.restaurantPrice}`}>{list.restaurantPrice}&euro;</h4>)

                            }
                            </p>

                            <label htmlFor="participant-number">Number of participants:</label> <input type="number" id="participant-number" className="label" placeholder="1" min="1" defaultValue="1"/>

                            <h4>Band:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.bandName}`}>{list.bandName}</h4>)

                            }
                            </h4>

                            <p>Band expenses:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.bandPrice}`}>{list.bandPrice}&euro;</h4>)

                            }
                            </p>
                            <h4>Activity:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.otherName}`}>{list.otherName}&euro;</h4>)

                            }
                            </h4>

                            <p>Activity expenses:         {reservation.map((list) =>
                                <h4 onLoad={getRestaurantReservationByUserId} key={`${list.otherPrice}`}>{list.otherPrice}&euro;</h4>)

                            }
                            </p>

                            {(reservation.length && auth ?
                                <a href className="button-style" onClick={calculatePrice}>Calculate price</a>
                                :
                                null
                            )}
                            <p><strong>Total expenses: {total}&euro;</strong></p>
                            {(reservation.length && auth ?
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