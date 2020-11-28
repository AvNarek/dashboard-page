import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useContext } from 'react';

import informationLogo from './information.svg';
import settingsLogo from './settings.svg';
import { ReactComponent as Notification } from './notification.svg';

import man from '../../assets/images/man.png';
import logo from '../../assets/images/xing.png';
import './Header.css';

const Header = () => {
  const {
    data: { user },
  } = useContext(UserContext);

  return (
    <header className="header">
      <div className="nav__top">
        <div className="company__logo">
          <img src={logo} alt="logo" />
          <h2>CompanyLogo</h2>
        </div>
        <ul className="item__list">
          <li>
            <Link to="/info">
              <img src={informationLogo} alt="information" />
            </Link>
          </li>
          <li className="list__element">
            <Link to="/notification">
              <Notification className="not__logo" />
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <img src={settingsLogo} alt="settings" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="user__info">
        <div className="info__left">
          <div className="user__photo">
            <img src={man} alt="user-logo" />
          </div>
        </div>
        <div className="info__right">
          <h3 className="user__name">{user.name}</h3>
          <p className="user__position">{user.position}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
