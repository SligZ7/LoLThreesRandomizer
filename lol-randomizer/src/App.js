import './App.css';
import { Randomizer } from './Content/index';
import Nav from './Components/Nav';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App" >
        <Nav />
        <Randomizer />
      </div>
    </Router>
  );
}

export default App;
