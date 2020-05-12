import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import AuthContext from '../auth/AuthContext';

function RestaurantCard({ location }) {

    const { auth } = useContext(AuthContext);

    return (
        <div className="card-body">
            <img className="card-img" alt="Restaurant" src={location.photo} />
            <h5 className="card-title">{location.name}</h5>
            <p className="restaurant-description">
                Rating:
                    {location.rating}/5
                    <FontAwesomeIcon className="font-awesome" size="lg" color="#f8be26" icon={faStar} /></p>
            <p className="restaurant-description">
                Price: {location.price} &euro;/Menu
                </p>
            <div className="inline-buttons">
                {
                    (auth ?
                        <Link className="button-style" to={"/restaurants/reserve/" + location.id} >Add to planner</Link>
                        :
                        null
                    )
                }
                <Link to={'/restaurants/' + location.id} className="button-style">Details</Link>

            </div>
        </div>
    );
}


export default RestaurantCard;