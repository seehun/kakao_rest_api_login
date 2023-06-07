import React from 'react';
import { REST_API_KEY, REDIRECT_URI } from '../config';

function Login() {
  return (
    <>
      <div>kakao login</div>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
      >
        kakao로 login
      </a>
    </>
  );
}

export default Login;
