import React from 'react';
import Header from './header/Header';
import Database from './Database/database.json';

function App() {
    return (
        <div>
            <Header user="Herciu" />
            <a href="https://www.google.com" target="_blank">Search for everything else here!</a>
            {Database.map((databaseList, index)=> {
                return <h1>{databaseList.Name}</h1>
            })}
        </div>
    );
}

export default App;