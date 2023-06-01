import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

function LoginProcess() {
  const [token, setToken] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const REST_API_KEY = '60af673ea132c4e08ec37a492dca87ab';
  const REDIRECT_URI = 'http://localhost:3000/loginProcess';

  //url에 인가코드가 있음
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    const body = {
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const sequential = async () => {
      //token 받기
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        body,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );
      //사용자 정보 가져오기
      const user_info = await axios.get('/v2/user/me', {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      console.log(user_info);
    };
    sequential();
  });

  return (
    <>
      <div>processing...</div>
    </>
  );
}

export default LoginProcess;
