import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';

function OtherCard({ distractions }) {
    
    const { auth } = useContext(AuthContext);


    return (
            <div className="card-body">
                <img className="card-img" alt="Restaurant" src={ distractions.photo } />
                <h5 className="card-title">{ distractions.name }</h5>
                <p className="other-description">
                    Price: { distractions.price } &euro;/Night
                </p>
                <div className="inline-buttons">
                    {
                        (auth ? 
                                <Link className="button-style" to={ "/other/reserve/" + distractions.id } >Add to planner</Link>
                            :
                                null
                        )
                    }
                    <Link to={ '/other/' + distractions.id } className="button-style">Details</Link>
                </div>
            </div>
    );
}


export default OtherCard;