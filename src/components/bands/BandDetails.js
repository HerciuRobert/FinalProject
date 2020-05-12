import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

function BandDetails() {
    const { bandId } = useParams();
    const [band, setBand] = useState(null);

    const { auth } = useContext(AuthContext);

    async function getBandById(id) {
        const res = await axios('/bands/' + id);
        setBand(res.data);
    }

    useEffect(() => {
        getBandById(bandId);
    }, [bandId]);

    if (band) {
        return (
            <div className="card-body-details">
                <h1>{band.name}</h1>
                <p><strong>Price: </strong>{band.price} &euro;/Event</p>
                <p><strong>Contact: </strong>{band.contact}</p>
                <p><strong>Short band description: </strong></p>
                <p>{band.description}</p>
                {
                    (auth ?
                        <Link className="button-style" to={"/bands/reserve/" + band.id} >Add to planner</Link>
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


export default BandDetails;