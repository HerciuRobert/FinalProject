import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import AuthContext from '../auth/AuthContext';

import ReserveRestaurant from '../restaurants/ReserveRestaurant';
import ReserveBand from '../bands/ReserveBand';
import ReserveOther from '../other/ReserveOther';


function SideNav({ event }) {
    const { restaurantId } = useParams();
    const { bandId } = useParams();
    const { otherId } = useParams();
    const [restaurant, setRestaurant] = useState([null]);
    const { auth } = useContext(AuthContext);

    return (
        <div className="side-nav-card">
            <article className="side-nav">
                <div>
                    <h3>My event</h3>
                    <h4>Restaurant</h4>
                    <p>Restaurant expenses:</p>
                    <label for="participant-number">Number of participants:</label> <input type="number" id="participant-number" className="label" placeholder="0" />
                    <h4>Band</h4>
                    <p>Band expenses:</p>
                    <h3>Other</h3>
                    <p>Other expenses:</p>
                    <p><strong>Total expenses:</strong></p>
                    <a href="/proceed-to-checkout" className="button-style">Delete event</a>
                </div>
            </article> 
        </div>

)}

export default SideNav;