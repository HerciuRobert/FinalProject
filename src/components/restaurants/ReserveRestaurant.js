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



    
    


    // async function getUnavailableById(id) {
    //     try{
    //         const links= await axios('/notavailable_restaurants' )
    //             .then(res => res.data);

    //         const promises = links.map(link => axios('/restaurants/' + link.restaurantId)
    //             .then(res => res.data));
    //         const unavailable = await Promise.all(promises);
    //         console.log('unavailable', unavailable);
    //         setUnavailableDate(unavailable);
    //     } catch(e) {
    //         console.warn(e)
    //     }
    // }

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

    return (
        <div className="register-login-card">
            {/* <form onSubmit={ handleReservation } className="form-control">      */}
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


export default ReserveRestaurant
