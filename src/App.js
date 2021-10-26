import logo from "./logo.svg";
import "./App.css";

import Box from "./Components/Box";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { on } from "./Server";
import moment from "moment";

import { write } from "./service/feathers";

function App() {
  const [Data, setData] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    write
      .find({
        query: {
          $limit: 10000,
        },
      })
      .then((res) => {
        console.log(res);
        setPositions(res.data);

      });
  }, []);

  useEffect(() => {
    on((connection) => (geoData) => {
      const date = new Date();
      const parseData = JSON.parse(geoData.position);
      parseData._geoloc["hora"] = moment(date).format("HH:mm:ss");
      parseData._geoloc["fecha"] = moment(date).format("DD-MM-YYYY");
      setData([parseData]); // ----> data
      write
        .find({
          query: {
            $limit: 10000,
          },
        })
        .then((res) => {
          console.log(res);
          setPositions(res.data);
        });
    });
  }, []);

  return (
    <div className="App">
      <head>
        <title>SmartTracking</title>
      </head>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        &nbsp;&nbsp;
        <h1>Smart Tracking</h1>
      </header>
      <Router>
                <nav className="nav-bar">
                    <ul>
                        <li>< Link className="menu" to="/"> Tiempo Real </Link></li>
                        <li>< Link className="menu" to="/History"> Histórico </Link></li>

                    </ul>
                </nav>
                <Route exact path="/">
                    <Box contenido="Maps" data={positions} realTime={Data}></Box>
                </Route>
                <Route path="/History">
                <Box contenido="Historico" data={positions} realTime={Data}></Box>
                </Route>
      </Router>

      
    </div>
  );
}

export default App;
