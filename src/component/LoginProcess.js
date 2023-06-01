import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

function LoginProcess() {
  const [token, setToken] = useState(null);
  const REST_API_KEY = '60af673ea132c4e08ec37a492dca87ab';
  const REDIRECT_URI = 'http://localhost:3000/loginProcess';

  const code = new URLSearchParams(window.location.search).get('code');

  const get_token = async () => {
    const body = {
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const res = await axios
      .post('https://kauth.kakao.com/oauth/token', body, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        // console.log('token:', res);
        // console.log('id_token: ', res.data.id_token);
        // console.log('id_token_docode: ', jwt_decode(res.data.id_token));
        setToken(res);
      });

    //
  };

  const bring_user_info = async () => {
    await axios
      .get('/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        console.log('사용자 정보 가져오기 ', res);
      });
  };

  useEffect(get_token, []);
  if (token) {
    // console.log(token);
    // console.log('access token: ', token.data.access_token);
    bring_user_info();
  }

  return (
    <>
      <div>processing...</div>
    </>
  );
}

export default LoginProcess;
