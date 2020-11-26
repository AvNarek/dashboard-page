import { useHistory } from 'react-router-dom';

import './Sidebar.css';

import Icons from '../../assets/icons/icons';
import { useContext } from 'react';
import { UserContext } from '../../userContext';

const Sidebar = () => {
  const history = useHistory();
  const { hamburger, toggleHamburger, logout } = useContext(UserContext);

  const changeActiveItem = (e) => {
    e.preventDefault();
    toggleHamburger();
    if (
      !e.target.classList.contains('item__element-active') &&
      e.target.nodeName === 'LI'
    ) {
      for (let item of e.target.parentNode.children) {
        item.classList.remove('item__element-active');
      }
      e.target.classList.add('item__element-active');
      history.push(`/${e.target.dataset.name}`);
    }
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
          <ul className="items__list" onClick={changeActiveItem}>
            <li className="item__element item__element-active" data-name="home">
              <Icons id="home" />
              Home
            </li>
            <li className="item__element" data-name="documents">
              <Icons id="document" />
              Documents
            </li>
            <li className="item__element" data-name="contacts">
              <Icons id="contact" />
              Contacts
            </li>
            <li className="item__element" data-name="recordings">
              <Icons id="recording" />
              Recordings
            </li>
            <li className="item__element" data-name="user-management">
              <Icons id="user" />
              User Management
            </li>
            <li className="item__element" data-name="interpreter-management">
              <Icons id="interpreter" />
              Interpreter Management
            </li>
            <li className="item__element" data-name="locations">
              <Icons id="location" />
              Locations
            </li>
          </ul>
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
