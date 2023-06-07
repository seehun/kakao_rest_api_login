import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { REST_API_KEY, REDIRECT_URI } from '../config';

function Home() {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      //id값이 없으면 -> 로그인이 되어있지 않으면
      setIsLogIn(false);
    } else {
      setIsLogIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('user_nickname');
    localStorage.removeItem('user_profile');
    setIsLogIn(false);

    axios.get(
      `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`
    );
  };

  return (
    <>
      <h2>home</h2>

      {isLogIn ? (
        <div>
          <div>{localStorage.getItem('user_nickname')}</div>
          <img
            src={localStorage.getItem('user_profile')}
            alt='profile'
            style={{ width: '120px', height: 'auto' }}
          />
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <a href='/login'>login</a>
      )}
    </>
  );
}

export default Home;
