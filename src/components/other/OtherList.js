import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OtherCard  from "./OtherCard";


function OtherList() {
    let [other, setOther] = useState([]);

    useEffect(() => {
        getOther();
    }, []);


    async function getOther() {
        const res = await axios('/other');
        setOther(res.data);
    }
    
    return (
        <div>  
            { other.map(other => <OtherCard distractions={ other } />) }
        </div>
    );
}
  
export default OtherList;