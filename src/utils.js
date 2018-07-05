/** Descrip */
import axios from 'axios';

const url = 'https://virtserver.swaggerhub.com/nyustit/rooms-api/7.0/';
/** api class */
export default class API {
  static loginUser(userNm, passWd) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${url}auth/login`,
        data: {
          username: userNm,
          password: passWd,
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      }).then((response) => {
        // parse jwt
        const userInfo = {
          'parseJWT(response.token)': 9,
          name: 'Sarah!',
        }
        // return users name
        resolve(userInfo.name);
      }).catch((error) => {
        console.log(error);
        reject(error.message);
      });
    });
  }
}
