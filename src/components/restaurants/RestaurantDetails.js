import React, { useEffect, useState, useContext } from 'react';
import  { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

function RestaurantDetails() {
    const { restaurantId }= useParams();
    const [restaurant, setRestaurant] = useState(null);

    const { auth } = useContext(AuthContext);
    
    async function getRestaurantById(id) {
            const res= await axios('/restaurants/' + id);
            setRestaurant(res.data);
    }
    
    useEffect(() => { 
        getRestaurantById(restaurantId); 
    }, [restaurantId]);

    if(restaurant) {
        return (
            <div className="card-body">
                <h1>{ restaurant.name }</h1>
                <img className="card-img" alt="Restaurant image" src={ restaurant.photo } />
                <p><strong>Location: </strong>{ restaurant.location }</p>
                <p><strong>Total capacity: </strong>{ restaurant.capacity }</p>
                <p><strong>Price/menu: </strong>{ restaurant.price } &euro;</p>
                <p><strong>Overall rating: </strong>{ restaurant.rating }</p>
                <p><strong>Contact: </strong>{ restaurant.contact }</p>
                <p><strong>Short restaurant description: </strong>{ restaurant.description }</p>
                {
                    (auth ? 
                            <Link className="button-style" to={ "/restaurants/reserve/" + restaurant.id } >Add to planner</Link>
                        :
                            null
                    )
                }
                
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
    
}


export default RestaurantDetails;