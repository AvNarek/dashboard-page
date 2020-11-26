import React from 'react';

export const UserContext = React.createContext({
  user: {},
  hamburger: false,
  toggleHamburger: () => {},
  auth: true,
  login: () => {},
  logout: () => {},
});
