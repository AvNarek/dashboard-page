import { NavLink } from 'react-router-dom';

import './Sidebar.css';

import Icons from '../../assets/icons/icons';
import { useContext } from 'react';
import { UserContext } from '../../userContext';

const SIDEBAR__ITEMS = [
  'home',
  'documents',
  'contacts',
  'recordings',
  'user',
  'interpreter',
  'locations',
];

const Sidebar = () => {
  const { hamburger, toggleHamburger, logout } = useContext(UserContext);

  const createSidebarList = () => {
    const items = SIDEBAR__ITEMS.map((item) => {
      const name =
        item === 'user' || item === 'interpreter' ? item + ' management' : item;

      return (
        <li key={name}>
          <NavLink
            className="item__element"
            activeClassName="item__element-active"
            to={item}
            onClick={toggleHamburger}
          >
            <Icons id={item} />
            {name}
          </NavLink>
        </li>
      );
    });
    return items;
  };

  return (
    <div className="sidebar">
      <div
        onClick={toggleHamburger}
        className={`sidebar__menu ${hamburger && 'sidebar__menu-active'}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`sidebar__content ${hamburger && 'active'}`}>
        <div className="sidebar__items">
          <ul className="items__list">{createSidebarList()}</ul>
        </div>
        <div className="logout">
          <button onClick={logout} className="btn btn__logout">
            <div className="left">
              <Icons id="logout" />
              <Icons id="vertical" />
              Log Out
            </div>
            <Icons id="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
