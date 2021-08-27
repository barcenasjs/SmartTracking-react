import logo from './logo.svg';
import './App.css';
import Box  from './Components/Box';


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
          <Box contenido ="Home"></Box>
        </Route> 
        <Route path = "/Maps" >
          <Box contenido ="Maps"></Box>
        </Route> 
        <Route path = "/Log" >
          <Box contenido ="Log"></Box>
        </Route> 
        
        <Route path = "/About_us" >
          <Box contenido = "About us"></Box>  
          
        </Route>


      </Router>




            </div>
        );
    }

    export default App;