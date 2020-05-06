import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BandCard  from "./BandCard";


function BandList() {
    let [bands, setBands] = useState([]);

    useEffect(() => {
        getBands();
    }, []);


    async function getBands() {
        const res = await axios('/bands');
        setBands(res.data);
    }
    return (
        <>
            <div className="visualized-category">
                <h1>Bands</h1>
            </div>
            <div className="card">  
                { bands.map(band => <BandCard banda={ band } key={band.id}/>) }
            </div>
        </>
    );
}
  
export default BandList;