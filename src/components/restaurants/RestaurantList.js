import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarList from '../shared/CalendarList';
import RestaurantCard  from "./RestaurantCard";
import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';



function RestaurantList() {

    let [restaurants, setRestaurants] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        getRestaurants();
    }, []);

    useEffect(() => {
        calendarDate();
    }, []);

    function calendarDate() {
        const currentDate = localStorage.getItem('calendar-date');
        if(calendarDate.length) {
            setFilterDate(currentDate)
        }
        
    }

    async function getRestaurants() {
        const res = await axios('/restaurants');
        setRestaurants(res.data);
        console.log(filterDate);
        // console.log(res.data[0]._notavailable.dateID, desiredDate);
        // for(const restaurant of restaurants) {
        //     setAvailableDate(restaurants.data[restaurant]._notavailable.dateID);
            
        //     if(desiredDate !== availableDate) {
        //         setSuccessful(true);
        //     }
        // }
    }
    
    return (
        <div>
            {restaurants.map(restaurant => <RestaurantCard location={ restaurant } />) }
            {/* { desiredDate } */}
        </div>
    );
}
  
export default RestaurantList;