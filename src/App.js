import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
    return ( <div className = "App" >
        <head >
          <title>
           { document.title = 'SmartTracking' } 
           </title> 
        </head> 

        <header className = "App-header" >
        <img src = { logo } className = "App-logo" alt = "logo"/>
        &nbsp;&nbsp;
        <h1>
        Smart Tracking 
        </h1> 
        </header> 
        <Router>
        <nav className = "nav-bar">
          <ul>
              <li> < Link to = "/"> Home </Link></li>
              <li> < Link to = "/Maps"> Maps </Link></li>
              <li> < Link to = "/Log" > Log </Link></li >
              <li> < Link to = "/About_us" > About us </Link></li >
          </ul> 
        </nav> 
        <Route exact path = "/" >
          <p> hello </p> 
        </Route> 
        <Route path = "/Maps" >
          <p> help </p> 
        </Route> 
          <Route path = "/Log" >
        <p > help </p> 
          </Route> 
        <Route path = "/About_us" >
          <div className="backsquater">
          <p> Este proyecto esta elaborado por los estudiantes tlataltal con el fin 
            de visualizar los datos de la ubicación geografica enviados desde los dispositivos gps</p> 
          
          
          
          
          
          </div>
        </Route>


      </Router>




            </div>
        );
    }

    export default App;