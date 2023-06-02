import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

function Home() {
  const [isLogIn, setIsLogIn] = useState(false);
  const REST_API_KEY = '60af673ea132c4e08ec37a492dca87ab';
  const REDIRECT_URI = 'http://localhost:3000';

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
