import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReserveBand() {
    const { bandId } = useParams();
    const [reservations, setReservations] = useState(null);

    async function getBandById(id) {
            const res= await axios('/bands/' + id);
            setReservations(res.data);
    }

    async function handleReservation(e) {
        e.preventDefault();
        const res= await axios('/bands/' + bandId, {
            method: 'PATCH',
            data: { 'disponibility': (reservations.disponibility) },
        })
        setReservations(res.data);
        console.log(res.data)
    }

    function handleInputChange(e) {
        setReservations({ ...reservations, disponibility: e.currentTarget.value });
    }

    useEffect(() => {
        getBandById(bandId);
    }, [bandId]);

    if(!reservations) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <form onSubmit={ handleReservation } className="form-control">     
                <div className="register-login-card">
                        <h1> { reservations.name } is reserved </h1>
                        <input 
                            onChange={ handleInputChange } 
                            value={ reservations.name } 
                            type="text" 
                            className={ 'input-form' } 
                            id="name" 
                            placeholder= "Enter name"
                        />
                    <button type="submit" className="auth-button-style" >Reserve</button>
                </div>
            </form>
        </>
    )
}


export default ReserveBand
