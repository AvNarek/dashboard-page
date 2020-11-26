import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { UserContext } from '../../userContext';
import data from '../../user-data.json';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Main from '../main/Main';

import './App.css';
import { useState } from 'react';
import Login from '../login/Login';

const App = () => {
  const [hamburger, setHamburger] = useState(false);
  const [auth, setAuth] = useState(true);

  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  const login = () => {
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
  };

  return (
    <div className="App">
      <Router>
        <UserContext.Provider
          value={{
            data,
            hamburger,
            toggleHamburger,
            auth,
            login,
            logout,
          }}
        >
          {!auth && <Redirect to="/login" />}
          {auth && <Redirect to="/home" />}
          <Switch>
            <Route path="/login" component={Login} />
            <>
              <Header />
              <Sidebar hamburger toggleHamburger={toggleHamburger} />
              <Main />
            </>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
