import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

import './Header.css';


function Header() {
    const { auth, setAuth } = useContext(AuthContext);
    // const {user, setUser} = useState('')
    
    function handleLogout(e) {
        e.preventDefault();
        setAuth(null);
        localStorage.removeItem('auth');
    }

    //     async function getUsersById(e) {
    //     const res= await axios.get('http://localhost:5000/users?firstname=' + e.currentTarget.firstname);
    //     setUser(res.data.firstname);
    // }

    return (
        <header className="header-all">
            <NavLink className="logo-style" to="/">E-Z Planner</NavLink>
            <nav>
                <ul className ="header-menu">
                    {( auth ?
                        <>
                        <li className="button-detail">
                        <NavLink  activeClassName="active" exact to="/">Home</NavLink>    
                        </li>
                        <a href="/" className="button-detail" onClick = { handleLogout }> Logout</a>
                        </>
                    :
                    // <>
                    <li className="button-detail">
                        <NavLink className="button-detail" activeClassName="active" exact to="/login"> Login </NavLink>
                        <NavLink className="button-detail" activeClassName="active" exact to="/register"> Register </NavLink>
                    </li>
                    // </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;