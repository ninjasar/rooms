/** Descrip */
import axios from 'axios';

const url = 'https://virtserver.swaggerhub.com/nyustit/rooms-api/8.0/';
const tsDate1 = new Date(Date.UTC(2018, 7, 12, 13)).toUTCString();
const tsDate2 = new Date(Date.UTC(2018, 7, 18, 23)).toUTCString();



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
  //takes position object, duration, and occupants. position object has location of user
  static closest(pos, duration, occupants) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}vacancies/closest`,
        params: {
          //latitude and longitude = pos.coords.latitude, etc
          latitude: pos[0],
          longitude: pos[1],
          duration: duration,
          occupants: occupants
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      }).then((response) => {
        //parseJWT
        const closestRoom = {
          'parseJWT(response.token)': 9,
          location: response.data.room.locationId,
          roomNumber: response.data.room.name,
          amenities: response.data.room.amenities,
          capacity: response.data.room.capacity,
          openTime: response.data.times[0].openTime,
          duration: response.data.times[0].duration,
          closeTime: response.data.times[0].closeTime,
        }
        //return closest room object
        resolve(closestRoom);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
  //search fn.  Takes all search parameters then returns object of rooms
  static search(openTime, closeTime, duration, locations, amenities, occupants) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}vacancies/search`,
        params: {
          openTime: tsDate1,
          closeTime: 2,
          duration: 3,
          locations: ['KIMMEL', 'BOBST'],
          amenities: ['coffee'],
          occupants: 4
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      }).then((response) => {
        //parseJWT
        const results = {
          'parseJWT(response.token)': 9,
          data: response.data,
        }
        //data is the list of rooms
        resolve(results.data);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }



}
