import React, { useEffect, useState, useContext } from 'react';
import  { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

function OtherDetails() {
    const { otherId }= useParams();
    const [other, setOther] = useState(null);

    const { auth } = useContext(AuthContext);
    
    async function getOtherById(id) {
            const res= await axios('/other/' + id);
            setOther(res.data);
            console.log(other)
    }
    
    useEffect(() => { 
        getOtherById(otherId); 
    }, [otherId]);

    if(other) {
        return (
            <div className="card-body">
                <h1>{ other.name }</h1>
                <img className="card-img" alt="Other image" src={ other.photo } />
                <p><strong>Price: </strong>{ other.price } &euro;</p>
                <p><strong>Contact: </strong>{ other.contact }</p>
                <p><strong>Short description: </strong>{ other.description }</p>
                {
                    (auth ? 
                            <Link className="button-style" to={ "/other/reserve/" + other.id } >Add to planner</Link>
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


export default OtherDetails;