import logo from "./logo.svg";
import "./App.css";

import Box from "./Components/Box";
import React, { useEffect, useState } from "react";
import { on } from "./Server";
import moment from "moment";
function App() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    on((connection) => (geoData) => {
      const date = new Date();
      const parseData = JSON.parse(geoData.position);
      parseData._geoloc["hora"] = moment(date).format("HH:mm:ss");
      parseData._geoloc["fecha"] = moment(date).format("DD-MM-YYYY");
      setData(parseData); // ----> data
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

      <Box contenido="Maps" data={Data}></Box>
    </div>
  );
}

export default App;
