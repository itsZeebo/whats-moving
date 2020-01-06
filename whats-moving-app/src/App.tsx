import './App.scss';

import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import UploadComponent from './components/UploadComponent';
import WatchComponent from './components/WatchComponent';

const ROUTES = [
  {
    title: "Upload",
    url: "/upload"
  },
  {
    title: "Watch",
    url: "/watch"
  }
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="app-nav">
          <img alt="logo" src={`${process.env.PUBLIC_URL}/assets/logo.svg`} className="logo" />
          {ROUTES.map(route => <Link to={route.url}>{route.title}</Link>)}
        </div>

        <div className="app-content">
          <Switch>
            <Route exact path="/" component={UploadComponent} />
            <Route exact path="/upload" component={UploadComponent} />
            <Route exact path="/watch" component={WatchComponent} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
