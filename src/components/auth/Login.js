import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';



const errorMessages = {
    email: 'Please enter an email address!',
    password: 'Please enter a password!'
}

function Login() {

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const [formError, setFormError] = useState({
        email: '',
        password: '',
        'invalid-email': '',
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccesful, setSuccessful] = useState(false);
    const [isDirty, setDirty] = useState(false);

    const { setAuth } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessful(false);
        const isInvalid = validateData() || await checkDatabaseUser();

        if (!isInvalid) {
            setDirty(false);
        }
    }

    function validateData() {
        const inputs = ['email', 'password'];
        const newError = { ...formError };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if (!formData.email.includes('@')) {
            newError['invalid-email'] = errorMessages['invalid-email'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    async function checkDatabaseUser() {
        const auth = await axios.get('/users?email=' + formData.email)
            .then(res => res.data);
        if (auth.length) {
            if (auth[0].password === formData.password) {
                setAuth(formData.email);
                localStorage.setItem('auth', formData.email);
                setSuccessful(true);
                history.replace(from);
                return true;
            }
            else {
                console.log("Invalid password")
                setGlobalError('Invalid password')
                return false;
            }
        }
        else {
            setGlobalError('Invalid credentials!')
            return false;
        }
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
            [e.currentTarget.id]: ''
        };
        if (e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }

        if (!(/@/.test(formData.email))) {
            newError['invalid-email'] = '';
        }

        setFormError(newError);
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="form-control">
                <h1>Welcome back!</h1>
                {/* <div className='invalid-feedback'>
                        { user.email } already exists!
                    </div> */}
                <div className="register-login-card">
                    {(globalErrorMessage ?
                        <div className="invalid-feedback">
                            Invalid credentials!
                            </div>
                        : null)}
                    {(isSuccesful ?
                        <div className="valid-feedback">
                            You've been succesfully authenticated!
                            </div>
                        : null)}
                    <div>
                        <label htmlFor="email">Email Address: </label>
                        <input
                            onChange={handleInputChange}
                            value={formData.email}
                            type="email"
                            className={'input-form' + (formError.email || formError['invalid-email'] ? ' is-invalid' : '')}
                            id="email"
                            placeholder="Email"
                        />
                        <div className='invalid-feedback'>
                            {formError.email}
                            {formError.email ? <br /> : ''}
                            {formError["invalid-email"]}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            onChange={handleInputChange}
                            value={formData.password}
                            className={'input-form' + (formError.password ? ' is-invalid' : '')}
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                        <div className='invalid-feedback'>
                            {formError.password}
                        </div>
                    </div>
                    <button type="submit" className="auth-button-style" disabled={!isDirty}>Login</button>
                </div>
            </form>
        </>
    )
}




export default Login;