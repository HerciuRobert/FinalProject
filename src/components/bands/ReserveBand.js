import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import DatePicker, { registerLocale } from "react-datepicker";
import en from 'date-fns/locale/en-GB';
import "react-datepicker/dist/react-datepicker.css";


import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';

function ReserveBand() {
    const { bandId } = useParams();
    const [reservations, setReservations] = useState(null);
    const [bandInfo, setBandInfo] = useState([]);

    const { auth } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());

    registerLocale('en-GB', en);

    function handleDateChange(date) {
        setReservations({ ...reservations, value: date }); 
        setDate(date);
        // getUnavailableById();
    }

    async function isDateAvailable(e) {
        e.preventDefault();
        if(await getCheckIfAvailable(formatDate(date), bandId)) {
            handleReservation();
        } else {
            console.log('This date is not available!');
        }
    }

    function formatDate(date) {
        const data = date;
        const year = data.getFullYear();
        const month = date.getMonth() + 1;
        const day = ('0' + data.getDate()).slice(-2);
        return day + '/0' + month + '/' + year;
    };

    

    async function getCheckIfAvailable(selectedDate, id) {
        console.log('DATA SELECTATA: ' + selectedDate)
        const res =  await axios('/notavailable_bands');
        res.data.forEach(element => {
            const entry = element.busy;
            if (entry.startsWith(id)) {
                const split = entry.split("#")[1];
                console.log('DATA OCUPATA: ' + split);
                if (selectedDate === split) {
                    console.log('busy')
                    return false;
                }
            }
        });
        return true;
    }


    async function handleReservation() { 
        const res = await axios('/reservations/', {
            method: 'POST',
            data: {
                'id': '',
                'event_name': "My event",
                'user_email': auth,
                'bandId': bandId,
                'date': formatDate(date),
                'bandName': bandInfo.name,
                'bandPrice': bandInfo.price
            },
        })
        setReservations(res.data);
        console.log(res.data)
    }

    async function getBandById(id) {
        const res = await axios('/restaurants/' + id);
       setBandInfo(res.data);
    }

    useEffect(() => {
        handleDateChange(date);
        formatDate(date);
    }, [date]);

    useEffect(() => {
        getBandById(bandId);
    }, [bandId]);


    return (
        <div className="register-login-card">
            <form onSubmit={isDateAvailable} className="form-control">
                <div >
                    <h1> The reservation is almost done!</h1>
                    <label htmlFor="name">Please select the desired date: </label>
                    <DatePicker selected={date} onChange={handleDateChange} locale="en-GB" dateFormat="dd/MM/yyyy" className={'input-form'} />
                    <button type="submit" className="auth-button-style" >Reserve</button>
                </div>
            </form>
        </div>
    )
}


export default ReserveBand
