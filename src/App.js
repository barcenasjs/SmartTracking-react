import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route ,Link} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <head>
        <title>        
        {document.title='Pruea'}
        </title>
      </head> 
      
      <header>
        <h1>
          Smart Tracking
        </h1>
      </header>
      <Router>
          <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Maps">Maps</Link></li>
                <li><Link to="/Log">Log</Link></li>
                <li><Link to="/About_us">About us</Link></li>
            </ul>
          </nav>
          <Route exact path="/"><p>hello</p></Route>
          <Route path="/Maps"><p>help</p></Route>
          <Route path="/Log"><p>help</p></Route>
          <Route path="/About_us"><p>help</p></Route>
      </Router>
        



    </div>
  );
}

export default App;
