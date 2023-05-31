import React from 'react';

function Login() {
  const REST_API_KEY = '60af673ea132c4e08ec37a492dca87ab';
  const REDIRECT_URI = 'http://localhost:3000/loginProcess';
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
