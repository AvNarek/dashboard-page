import { Route, Switch, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../../userContext';

import Home from './home/Home';
import Documents from './document/Documents';
import Contacts from './contact/Contacts';

import './Main.css';

function Main() {
  const { data, hamburger } = useContext(UserContext);
  const activePage = useLocation();

  return (
    <div className={`main ${hamburger && 'main__close'}`}>
      <span className="main__title">
        {activePage.pathname.replace('/', '')}
      </span>
      <Switch>
        <Route exact path="/home" render={() => <Home user={data.user} />} />
        <Route
          exact
          path="/documents"
          render={() => <Documents documents={data.documents} />}
        />
        <Route
          exact
          path="/contacts"
          render={() => <Contacts documents={data.contacts} />}
        />
      </Switch>
    </div>
  );
}

export default Main;
