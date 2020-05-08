import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import DatePicker, { registerLocale } from "react-datepicker";
import en from 'date-fns/locale/en-GB';
import "react-datepicker/dist/react-datepicker.css";


import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';

function ReserveRestaurant() {
    const { restaurantId } = useParams();
    const [reservations, setReservations] = useState(null);
    const [restaurantInfo, setRestaurantInfo] = useState([]);



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
        if(await getCheckIfAvailable(formatDate(date), restaurantId)) {
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
        const res =  await axios('/notavailable_restaurants');
        let available = true;
        res.data.find(element => {
            const entry = element.busy;
            const reservedRestaurantId=entry.split("#")[0];
            const reservedDate=entry.split("#")[1];
            // debugger;
                if (selectedDate === reservedDate && reservedRestaurantId === id) {
                    console.log('DATA OCUPATA: ' + reservedDate);
                    console.log('busy')
                    available = false;
                }           
        });
        return available;
    }

    async function handleReservation() { 
        const res = await axios('/reservations/', {
            method: 'POST',
            data: {
                'id': '',
                'event_name': "My event",
                'user_email': auth,
                'restaurantId': restaurantId,
                'date': formatDate(date),
                'restaurantName': restaurantInfo.name,
                'restaurantPrice': restaurantInfo.price
            },
        })
        setReservations(res.data);
        console.log(res.data)
    }

    async function getRestaurantById(id) {
        const res = await axios('/restaurants/' + id);
       setRestaurantInfo(res.data);
    }


    useEffect(() => {
        handleDateChange(date);
        formatDate(date);
    }, [date]);

    useEffect(() => {
        getRestaurantById(restaurantId);
    }, [restaurantId]);

    useEffect(() => {
        getRestaurantReservationByUserId(auth);
    }, [auth]);

    let [reservedRestaurant, setReservedRestaurant] = useState([]);

    async function getRestaurantReservationByUserId(id) {
        const reservation = await axios.get('/reservations/?user_email=' + auth).then(res => res.data);
        console.log(reservation)
        setReservedRestaurant(reservation);
    }

    return (
        <div className="register-login-card">
            {
                reservedRestaurant.length >= 1 ? <h1> You already have a reservation at {reservedRestaurant[0].restaurantName} on {reservedRestaurant[0].date} </h1> : 
                <form onSubmit={isDateAvailable} className="form-control">
                <div >
                    <h1> Your reservation at {restaurantInfo.name} is almost done!</h1>
                    <label htmlFor="name">Please select the desired date: </label>
                    <DatePicker selected={date} onChange={handleDateChange} locale="en-GB" dateFormat="dd/MM/yyyy" className={'input-form'} />
                    <button type="submit" className="auth-button-style" >Reserve</button>
                </div>
            </form>
            }

        </div>
    )
}


export default ReserveRestaurant