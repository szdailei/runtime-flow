import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import makeid from './lib/makeid.js';
import { ROOT_PATH } from './lib/route.js';
import { useRemoteConfig } from './lib/cache.js';
import { Loading, NotFound } from './components/index.js';
import Home from './pages/Home.jsx';

function App() {
  const { data } = useRemoteConfig();
  if (!data) return <Loading />;

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
