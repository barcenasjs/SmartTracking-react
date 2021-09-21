import logo from "./logo.svg";
import "./App.css";

import Box from "./Components/Box";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { on } from "./Server";
import moment from "moment";
function App() {
  const [state, setState] = useState({
    _geoloc: {
      lat: "",
      lng: "",
      hora: "",
      fecha: "",
    },
  });
  useEffect(() => {
    on((connection) => (geoData) => {
      const date = new Date();
      const parseData = JSON.parse(geoData.position);
      parseData._geoloc["hora"] = moment(date).format("HH:mm:ss");
      parseData._geoloc["fecha"] = moment(date).format("DD-MM-YYYY");
      setState(parseData); // ----> data});
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
            <li>
              <Link className="menu" to="/">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li>
              <Link className="menu" to="/Maps">
                {" "}
                Maps{" "}
              </Link>
            </li>
            <li>
              <Link className="menu" to="/Log">
                {" "}
                Log{" "}
              </Link>
            </li>
            <li>
              <Link className="menu" to="/About_us">
                {" "}
                About us{" "}
              </Link>
            </li>
          </ul>
        </nav>
        <Route exact path="/">
          <Box contenido="Home" data={state}></Box>
        </Route>
        <Route path="/Maps">
          <Box contenido="Maps" data={state}></Box>
        </Route>
        <Route path="/Log">
          <Box contenido="Log" data={state}></Box>
        </Route>
        <Route path="/About_us">
          <Box contenido="About us" data={state}></Box>
        </Route>
      </Router>
    </div>
  );
}

export default App;
