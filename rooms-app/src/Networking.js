import React from 'react';
import ax from 'axios';
const url = 'https://virtserver.swaggerhub.com/nyustit/rooms/5.0/';

const loginFn(userNm, passWd) = axios.post(url + '/auth/login', {
  data: {
    username: userNm,
    password: passWd
  },
  headers: {'accept': 'application/json'},
  }).then(res => console.log(response))
    .catch(function (error) {
    console.log(error);
  });
