import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { routes } from '~/routes';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map(({ path, Component }, index) => (
            <Route path={path} element={<Component></Component>} key={index}></Route>
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
