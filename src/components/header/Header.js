import React from 'react';


function Header(props) {
    const a = 'Robert';
    return (
        <header>
            <h1>E-Z Planner/Logo</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a>Profile</a></li>
                </ul>
            </nav>
            <section>
                Welcome, { props.user } { a } !
            </section>
        </header>
    );
}

export default Header;