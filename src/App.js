import logo from './logo.svg';
import './App.css';

import Box  from './Components/Box';
import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.escucha()
      .then(res => this.setState({data: res.express}))
      .catch(err => console.log(err));
  }
  escucha(){
    async () => {
      const response = await fetch(':3030');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    }
  }
  render(){
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
              <li> < Link className ="menu" to = "/"  > Home </Link></li>
              <li> < Link className ="menu" to = "/Maps" > Maps </Link></li>
              <li> < Link className ="menu" to = "/Log" > Log </Link></li >
              <li> < Link className ="menu" to = "/About_us" > About us </Link></li >
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
  
}
export default App;