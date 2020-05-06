import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard  from "./RestaurantCard";




function RestaurantList() {

    let [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const res = await axios('/restaurants');
        setRestaurants(res.data);
        // console.log(res.data[0]._notavailable.dateID, desiredDate);
        // for(const restaurant of restaurants) {
        //     setAvailableDate(restaurants.data[restaurant]._notavailable.dateID);
            
        //     if(desiredDate !== availableDate) {
        //         setSuccessful(true);
        //     }
        // }
    }
    
    return (
        <>
        <div className="visualized-category">
            <h1>Restaurants</h1>
        </div>
        <div className= "card">
            {restaurants.map(restaurant => <RestaurantCard location={ restaurant } key={restaurant.id}/>) }
        </div>
        </>
    );
}
  
export default RestaurantList;