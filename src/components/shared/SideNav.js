
import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import AuthContext from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalculator, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
        axios('/reservations/' + reservation[0].id, {
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
        removeFromNotAvailableDates();
        window.location.reload();
        console.log(reservation[0].otherName)
    }

    async function removeFromNotAvailableDates() {
        await axios.delete('/notavailable_restaurants?busy=' + reservation[0].restaurantId + '#' + reservation[0].date);
        if (reservation[0].bandId !== undefined) {
            await axios.delete('/notavailable_bands?busy=' + reservation[0].bandId + '#' + reservation[0].date);

        }
        if (reservation[0].otherId !== undefined) {
            await axios.delete('/notavailable_other?busy=' + reservation[0].otherId + '#' + reservation[0].date);

        }
    }

    function calculatePrice(e) {
        e.preventDefault();
        let participants = document.getElementById('participant-number').value;
        let totalRestaurant = participants * reservation[0].restaurantPrice;
        let totalBand = reservation[0].bandPrice;
        let totalOther = reservation[0].otherPrice;
        if (totalBand === undefined) {
            totalBand = 0;
        }
        if (totalOther === undefined) {
            totalOther = 0;
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
                                    className="edit-name-label"
                                /> : null)}
                            {(reservation.length && auth ?
                                <a href="/" className="button-style" onClick={updateEventName}><FontAwesomeIcon className="font-awesome" size="lg" icon={faEdit} /> Edit name</a>
                                :
                                null
                            )}
                            {(reservation.length && auth ?
                                <p>
                                    <a href="/" className="button-style" onClick={handleDelete}><FontAwesomeIcon className="font-awesome" size="lg" icon={faTrashAlt} /> Delete event</a>
                                </p>
                                :
                                null
                            )}
                            <h5>Save the date:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.date}`}>{list.date}</p>)

                            }
                            </h5>

                            <h5>Restaurant:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.restaurantName}`}>{list.restaurantName}</p>)

                            }
                            </h5>

                            <h5>Restaurant expenses:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.restaurantPrice}`}>{list.restaurantPrice}&euro;</p>)

                            }
                            </h5>

                            <h5 htmlFor="participant-number">Number of participants:</h5> <input type="number" id="participant-number" className="label" placeholder="1" min="1" defaultValue="1" />

                            <h5>Band:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.bandName}`}>{list.bandName}</p>)

                            }
                            </h5>

                            <h5>Band expenses:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.bandPrice}`}>{list.bandPrice}&euro;</p>)

                            }
                            </h5>
                            <h5>Activity:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.otherName}`}>{list.otherName}</p>)

                            }
                            </h5>

                            <h5>Activity expenses:         {reservation.map((list) =>
                                <p onLoad={getRestaurantReservationByUserId} key={`${list.otherPrice}`}>{list.otherPrice}&euro;</p>)

                            }
                            </h5>

                            {(reservation.length && auth ?
                                <a href="/" className="button-style" onClick={calculatePrice}><FontAwesomeIcon className="font-awesome" size="lg" icon={faCalculator} />Calculate price</a>
                                :
                                null
                            )}
                            <h5><strong>Total expenses: {total}&euro;</strong></h5>
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