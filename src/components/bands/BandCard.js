import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';

function BandCard({ banda }) {
    
    const { auth } = useContext(AuthContext);


    return (
            <div className="card-body">
                <img className="card-img" alt="Band" src={ banda.photo } />
                <h5 className="card-title">{ banda.name }</h5>
                <p className="band-description">
                    Price: { banda.price } &euro;/Night
                </p>
                <div className="inline-buttons">
                    {
                        (auth ? 
                                <Link className="button-style" to={ "/bands/reserve/" + banda.id } >Add to planner</Link>
                            :
                                null
                        )
                    }
                    <Link to={ '/bands/' + banda.id } className="button-style">Details</Link>
                </div>
            </div>
    );
}


export default BandCard;