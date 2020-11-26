import { useContext, useState } from 'react';
import { UserContext } from '../../userContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      login();
    } else {
      setValidate(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler} className="login__form">
        <h2>Login</h2>
        <input
          type="mail"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn__login">Login</button>
        {!validate && (
          <h4 style={{ color: '#F32013' }}>Enter valid email and password</h4>
        )}
      </form>
    </div>
  );
};

export default Login;
