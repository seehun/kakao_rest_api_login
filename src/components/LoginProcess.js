import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { REST_API_KEY, REDIRECT_URI } from '../config';

function LoginProcess() {
  const [userObj, setUserObj] = useState(null);

  //url에 인가코드가 있음
  const code = new URLSearchParams(window.location.search).get('code');

  const body = {
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
  };

  useEffect(() => {
    const sequential = async () => {
      //token 받기
      const token = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        body,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );
      localStorage.setItem('access_token', token.data.access_token); //logout할 때 필요
      //사용자 정보 가져오기
      const user_info = await axios.get('/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      setUserObj(user_info.data);
    };
    sequential();
  }, []);

  if (userObj) {
    //처음에는 userObj값이 null이지만 useEffect함수를 실행한 후 객체 값이 들어간다.
    console.log(userObj);
    localStorage.setItem('id', userObj.id);
    localStorage.setItem('user_nickname', userObj.properties.nickname);
    localStorage.setItem('user_profile', userObj.properties.profile_image);
    window.location.href = '/';
  }

  return (
    <>
      <div>processing...</div>
    </>
  );
}

export default LoginProcess;
