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
        <>
            <div className="visualized-category">
                <h1>Activities</h1>
            </div>
            <div className="card">  
                { other.map(other => <OtherCard distractions={ other } key={other.id}/>) }
            </div>
        </>
    );
}
  
export default OtherList;