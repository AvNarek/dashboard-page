import { UserContext } from '../../userContext';
import { useContext } from 'react';

import informationLogo from './information.svg';
import settingsLogo from './settings.svg';
import NotLogo from './notification';

import man from '../../assets/images/man.png';
import logo from '../../assets/icons/xing.png';
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
            <a href="/settings">
              <img src={informationLogo} alt="information" />
            </a>
          </li>
          <li className="list__element">
            <a href="/notification">
              <NotLogo />
            </a>
          </li>
          <li>
            <a href="/settings">
              <img src={settingsLogo} alt="settings" />
            </a>
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
