import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';
import RestaurantList from '../restaurants/RestaurantList';


import { getYear, getMonth, getDate } from '@wojtekmaj/date-utils';

function CalendarList() {
    const [date,setDate] = useState(new Date());
    let [desiredDate, setDesiredDate ] = useState([]);
    const year = getYear(date);
    const month = getMonth(date) + 1;
    const day = getDate(date);
    const formatDate = day + '-' + month + '-' + year;

    function onChange(date) {
        setDate(date);
        handleDateFormat();
    }

    async function handleDateFormat() {
        const desiredDate = await formatDate;
        if(desiredDate) {
            // console.log(desiredDate);
            setDesiredDate(formatDate);
            localStorage.setItem('calendar-date', formatDate);
        }
    }

    useEffect(() => {
        handleDateFormat(formatDate);
    }, []);




    return(
        <div className="calendar-card calendar-style">
            <Calendar className="calendar-style" onChange= { onChange } value= { date }  />
            { console.log(desiredDate) }
            <div className="right-buttons">
                { desiredDate }
            </div>
        </div>
    )
}

export default CalendarList;
