import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
import Blog from './components/Blog/Blog';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Contact from './components/Contact/Contact';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/destination/:name">
              <Destination />
            </PrivateRoute>
            <Route path="/blog">
              <Blog />
            </Route>
            <PrivateRoute path="/destination">
              <Home />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
            <NoMatch />
          </Route>
          </Switch>
      </Router>
    </UserContext.Provider>  
  );
}

export default App;
