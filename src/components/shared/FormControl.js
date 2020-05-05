import React, { useState, useEffect } from 'react';

function FormControl({ type, name, label, shouldValidate, validation, onStatusChange, onInputChanged }) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage]= useState('');

    function handleInputChange(e) {
        onStatusChange('isDirty', name);
        setErrorMessage('');
        onInputChanged(name, e.currentTarget.value);
        setValue(e.currentTarget.value);
    }


    useEffect(() => {
        if(shouldValidate) {
            validateValue(name, value, validation, setErrorMessage, onStatusChange);
        }
    }, [name, shouldValidate, value, validation, onStatusChange]);

    
    return (
        <div>
            <label htmlFor={ name }>{ label } </label>
            <input 
                onChange={ handleInputChange } 
                value={ value } 
                className={'input-form' + (errorMessage ? ' is-invalid' : '') } 
                type={ type } 
                id={ name } 
                placeholder={ label } 
            />
            <div className='invalid-feedback'>
                { errorMessage }
            </div>
        </div>
    )
}

function validateValue(name,value, validation, setErrorMessage, onStatusChange) {
    if(validation.required && !value) {
        setErrorMessage(validation.messages.required);
        onStatusChange('isInvalid', name);
        return;
    }

    if(validation.minLength && value.length < validation.minLength) {
        setErrorMessage(validation.messages.minLength);
        onStatusChange('isInvalid', name);
        return;
    }
}


export default FormControl