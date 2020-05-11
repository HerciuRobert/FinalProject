import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from "./RestaurantCard";



function RestaurantList() {

    let [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const res = await axios('/restaurants');
        setRestaurants(res.data);
    }

    return (
        <>
            <div className="visualized-category">
                <h1>Restaurants</h1>
            </div>
            <div className="card">
                {restaurants.map(restaurant => <RestaurantCard location={restaurant} key={restaurant.id} />)}
            </div>
        </>
    );
}

export default RestaurantList;