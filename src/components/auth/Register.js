import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';

import './Auth.css';

const errorMessages = {
    email: 'Please enter an email address!',
    firstname: 'Please enter your first name!',
    lastname: 'Please enter your last name!',
    password: 'Please enter a password!',
    'retype-password': 'Please retype the password!',
    'different-passwords': 'Please enter the same password twice!',
    'invalid-email': 'Please enter a valid email address!'
}

function Register() {

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        'retype-password': ''
    });

    const [formError, setFormError] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        'retype-password': '',
        'different-passwords': '',
        'invalid-email': '',
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccesful, setSuccessful] = useState(false);
    const [isDirty, setDirty] = useState(false);

    const { setAuth } = useContext(AuthContext);


    // async function getUsersById(id) {
    //     const res= await axios('http://localhost:5000/users/');
    //     setUser(res.data.firstname);
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessful(false);
        const isInvalid = validateData() || await checkDatabaseUser();

        if(!isInvalid) {
            setDirty(false);
            try {
                const res = await axios.post('/users', formData);
                    console.log(res);
                    setAuth(res.data.email);
                    localStorage.setItem('auth', res.data.email)
                    setSuccessful(true);
                    history.replace(from);
                } catch(e) {
                    console.log(e.res.data.message);
                }
        }
    }

    function validateData() {
        const inputs = ['email', 'firstname', 'lastname', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;

        for(const input of inputs) {
            if (!formData[input]) {
                    newError[input]= errorMessages[input];
                    isInvalid = true;
                }
            }
        
            if(formData.password !== formData['retype-password']) {
                newError['different-passwords'] = errorMessages['different-passwords'];
                isInvalid = true;
            }
            
            if((!formData.email.includes('@')) && (formData.password !== formData['retype-password'])) {
                    newError['invalid-email'] = errorMessages['invalid-email'];
                    isInvalid = true;
                }
        
        setFormError(newError);
        return isInvalid;
    }

    async function checkDatabaseUser() {
        const auth = await axios.get('/users?email=' + formData.email)
        .then(res => res.data);

        if(auth.length) {
            setGlobalError("User already exists!");
            return true;
        }
        return false;
    }

    function handleInputChange(e) {
        // console.log(e.currentTarget.id, e.currentTarget.value);
        setDirty(true);
        
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
        const newError = { 
            ...formError, 
            [e.currentTarget.id]:'' 
    };
        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords']= '';
        }

        if(!(/@/.test(formData.email))) {
            newError['invalid-email']= '';
        }

        setFormError(newError);
    }

    // console.log(formError);

    return (
        <>

        <form onSubmit={ handleSubmit } className="form-control">
            <h1>Welcome to E-Z Planner</h1>
            {/* <div className='invalid-feedback'>
                { user.email } already exists!
            </div> */}
            <div className="register-login-card">
                { (globalErrorMessage ?
                    <div className="invalid-feedback">
                        This account already exists!
                    </div>
                : null) }
                { (isSuccesful ?
                    <div className="valid-feedback">
                        Your account was created succesfully!
                    </div>
                : null) }
                <div>
                    <label htmlFor="email">Email Address: </label>
                    <input 
                        onChange={ handleInputChange } 
                        value={ formData.email } 
                        type="email" 
                        className={'input-form' + (formError.email || formError['invalid-email'] ? ' is-invalid' : '') } 
                        id="email" 
                        placeholder="Email" 
                    />
                    <div className='invalid-feedback'>
                        { formError.email }
                        { formError.email ? <br /> : '' }
                        { formError["invalid-email"] }
                    </div>
                </div>
                <div>
                    <label htmlFor="firstname">First name: </label>
                    <input 
                        onChange={ handleInputChange } 
                        value={ formData.firstname } 
                        className={'input-name' + (formError.firstname ? ' is-invalid' : '') } 
                        type="text" 
                        id="firstname" 
                        placeholder="First name" 
                    />
                    <div className='invalid-feedback'>
                        { formError.firstname }
                    </div>
                </div>
                <div>
                    <label htmlFor="lastname">Last name: </label>
                    <input 
                        onChange={ handleInputChange } 
                        value={ formData.lastname } 
                        className={'input-name' + (formError.lastname ? ' is-invalid' : '') } 
                        type="text" 
                        id="lastname" 
                        placeholder="Last name" 
                    />
                    <div className='invalid-feedback'>
                        { formError.lastname }
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        onChange={ handleInputChange } 
                        value={ formData.password } 
                        className={'input-form' + (formError.password ? ' is-invalid' : '') } 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                    />
                    <div className='invalid-feedback'>
                        { formError.password }
                    </div>
                </div>
                <div>
                    <label htmlFor="retype-password">Retype password: </label>
                    <input 
                        onChange={ handleInputChange } 
                        value={ formData['retype-password'] } 
                        className={'input-form' + (formError['retype-password'] || formError['different-passwords'] ? ' is-invalid' : '') } 
                        type="password" 
                        id="retype-password" 
                        placeholder="Retype password" 
                    />
                    <div className='invalid-feedback'>
                        { formError['retype-password'] }
                        { formError['retype-password'] ? <br /> : '' }
                        { formError['different-passwords'] }
                    </div>
                </div>
                <button type="submit" className="auth-button-style" disabled={ !isDirty }>Sign up</button>
            </div>
        </form>
        </>
    );
}

export default Register;