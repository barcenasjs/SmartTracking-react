import logo from './logo.svg';
import './App.css';

import Box from './Components/Box';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {on} from "./Server";
import moment from "moment";
function App() {
    const [Data, setData] = useState([])

    useEffect(() => {
        on((connection) => (geoData) => {
            const date= new Date();
            geoData._geoloc["hora"]= moment(date).format("HH:mm:ss");
            geoData._geoloc["fecha"]= moment(date).format("DD-MM-YYYY")
            setData([...Data,geoData]); // ----> data
            
        })
    }, []);

    return (
        <div className="App">
            <head>
                <title>
                    SmartTracking
                </title>
            </head>

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                &nbsp;&nbsp;
                <h1>
                    Smart Tracking
                </h1>
            </header>
            <Router>
                <nav className="nav-bar">
                    <ul>
                        <li>< Link className="menu" to="/"> Home </Link></li>
                        <li>< Link className="menu" to="/Maps"> Maps </Link></li>
                        
                        <li>< Link className="menu" to="/About_us"> About us </Link></li>
                    </ul>
                </nav>
                <Route exact path="/">
                    <Box contenido="Home" data={Data}></Box>
                </Route>
                <Route path="/Maps">
                    <Box contenido="Maps" data={Data}></Box>
                </Route>
                
                <Route path="/About_us">
                    <Box contenido="About us" data={Data}></Box>
                </Route>
            </Router>
            <button
            onClick={()=>{console.log(Data)}}
            >
                <p>hello</p>
            </button>
        </div>
    )
}

export default App;
