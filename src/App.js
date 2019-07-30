import React from 'react';

import User from './components/User';

import './styles/css/app.css';


function App() {
    return (
        <div className="app">
            <header>
                <h2>User's Github Info</h2>
            </header>

            <div className="container">
                <div className="col-sm-12">
                    <User />
                </div>
            </div>
        </div>
    );
}

export default App;
