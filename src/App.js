import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import Coin from './page/Coin';
import Search from './page/Search';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/Coin/:id" element={<Coin />}>
        </Route>
        <Route path="/" element={<Search />}>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
