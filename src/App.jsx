import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Standard from "./Pages/Standard/Standard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faFlask } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <h2>Calculadora</h2>
          <div className="sidebar-separator"></div>
          <nav>
            <ul>
              <li>
                <Link to="/React-Calculator"><span><FontAwesomeIcon icon={faFlask} /></span>Padrão</Link>
              </li>
              <li>
                <Link to="/sci"><span><FontAwesomeIcon icon={faCalculator} /></span>Científica</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='content'>
          <Routes>
            <Route path='/React-Calculator' element={<Standard />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
