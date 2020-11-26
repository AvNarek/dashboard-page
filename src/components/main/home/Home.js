import logo from '../../../assets/icons/xing.png';

import './Home.css';

function Home({ user }) {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">
          Welcome!
          <span>{user.name}</span>
        </h1>
        <div className="company__logo">
          <img src={logo} alt="logo" />
          <h1>CompanyLOGO</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
