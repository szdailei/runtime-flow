import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import makeid from './lib/makeid.js';
import { ROOT_PATH } from './route/route.js';
import init from './init.js';
import { NotFound } from './components/index.js';
import Home from './pages/Home.jsx';

function App() {
  init();

  const routes = [
    { path: ROOT_PATH, element: <Home /> },
    { path: '*', element: <NotFound /> },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={makeid()} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
