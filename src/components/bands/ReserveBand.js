import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import { useLocation, useHistory } from 'react-router-dom';

import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';

function ReserveBand() {
    const { bandId } = useParams();
    const [bandInfo, setBandInfo] = useState([]);

    const { auth } = useContext(AuthContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [currentReservation, setCurrentReservation] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        getReservationByUserId(auth);
    }, [auth]);

    useEffect(() => {
        getBandById(bandId);
    }, [bandId]);

    async function isDateAvailable(e) {
        e.preventDefault();
        if (await isAvailable()) {
            handleReservation();
            window.location.reload();
        } else {
            console.log('This date is not available!');
        }
    }

    window.onload = isDateAvailable();

    async function isDateAvailable() {
        if (currentReservation.length) {
            console.log('DATA DEJA REZERVATA: ' + currentReservation[0].date)
            const res = await axios('/notavailable_bands');
            res.data.forEach(element => {
                const entry = element.busy;
                if (entry.startsWith(bandId)) {
                    const split = entry.split("#")[1];
                    console.log('DATA OCUPATA: ' + split);
                    if (currentReservation[0].date === split) {
                        console.log('busy')
                        setIsAvailable(false);
                        return false;
                    }
                }
            });
            return true;
        }
    }

    async function handleReservation() {
        const res = await axios('/reservations/' + currentReservation[0].id, {
            method: 'PATCH',
            data: {
                'bandName': bandInfo.name,
                'bandPrice': bandInfo.price
            },
        })
        setDateAsUnavailable();
        history.replace(from);
        window.location.reload();
        console.log(res.data);
    }

    async function setDateAsUnavailable(){
        const res = await axios('/notavailable_bands/', {
            method: 'POST',
            data: {
                'id': '',
                'bandId': bandId,
                'busy': bandId + "#" + currentReservation[0].date
            },
        })
    }

    async function getBandById(id) {
        const res = await axios('/bands/' + id);
        setBandInfo(res.data);
    }

    async function getReservationByUserId(id) {
        const reservation = await axios.get('/reservations/?user_email=' + auth).then(res => res.data);
        console.log(reservation)
        setCurrentReservation(reservation);
    }

    return (
        <div className="register-login-card">
            {

                currentReservation.length < 1 ? <h1> You must have a restaurant reservation before booking a band </h1> :
                    currentReservation[0].bandName ?
                        <h1> You currently have a reservation at {currentReservation[0].bandName} on {currentReservation[0].date}.</h1>
                        : isAvailable ?
                            <form onSubmit={handleReservation} className="form-control">
                                <div >

                                    <h1> The band is available at on the date of your restaurant reservation, you can proceed booking {bandInfo.name} for your event!</h1>
                                    <button type="submit" className="auth-button-style" >Reserve</button>

                                </div>
                            </form>
                            :
                            <h1> The band is not available on the date of your restaurant reservation 😞 </h1>
            }

        </div>
    )
}


export default ReserveBand