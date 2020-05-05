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
        <div>  
            { bands.map(band => <BandCard banda={ band } />) }
        </div>
    );
}
  
export default BandList;