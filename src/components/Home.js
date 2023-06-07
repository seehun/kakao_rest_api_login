import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { REST_API_KEY, REDIRECT_URI, ADMIN_KEY } from '../config';

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

  const logout = async () => {
    //사용자 액세스 토큰과 리프레시 토큰을 모두 만료시킨다.
    const logout_user = await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    console.log(logout_user);

    localStorage.removeItem('id');
    localStorage.removeItem('user_nickname');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('access_token');
    setIsLogIn(false);
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
