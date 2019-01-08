/** Descrip */
import axios from 'axios';

const url = 'https://virtserver.swaggerhub.com/nyustit/rooms-api/10.0/';
const token = 'x';
const Authorization = `Bearer ${token}`;

const TEST = process.env.stage == 'dev' || process.env.stage == 'test';


/** api class */
export default class API {
   static usersInfo = {
    username: "rmr478",
    name: "Rayat Rahman",
    email: "fake12@nyu.edu",
    id: "12315ASaf",
    alternates: [
      "fake12@nyu.edu",
      "fake23@nyu.edu"
    ],
  };
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
          //'token': "parseJWT(response.token)",
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
  static async closest(pos, duration, occupants) {
    try{
      let res = await axios({
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
        });
        const closestRoom = {
             'parseJWT(response.token)': 9,
             location: res.data.room.locationId,
             roomNumber: res.data.room.name,
             id: res.data.room.id,
             amenities: res.data.room.amenities,
             capacity: res.data.room.capacity,
             openTime: res.data.times[0].openTime,
             duration: res.data.times[0].duration,
             closeTime: res.data.times[0].closeTime,
           }
          return closestRoom;
      }catch(error) {
          return error.message;
        }


    // return new Promise((resolve, reject) => {
    //   axios({
    //     method: 'get',
    //     url: `${url}vacancies/closest`,
    //     params: {
    //       //latitude and longitude = pos.coords.latitude, etc
    //       latitude: pos[0],
    //       longitude: pos[1],
    //       duration: duration,
    //       occupants: occupants
    //     },
    //     headers: {
    //       'accept': 'application/json',
    //       'content-type': 'application/json',
    //
    //     }
    //   }).then((response) => {
    //     //parseJWT
    //     const closestRoom = {
    //       'parseJWT(response.token)': 9,
    //       location: response.data.room.locationId,
    //       roomNumber: response.data.room.name,
    //       amenities: response.data.room.amenities,
    //       capacity: response.data.room.capacity,
    //       openTime: response.data.times[0].openTime,
    //       duration: response.data.times[0].duration,
    //       closeTime: response.data.times[0].closeTime,
    //     }
    //     //return closest room object
    //     resolve(closestRoom);
    //   }).catch((error) => {
    //     console.log(error);
    //     reject(error);
    //   });
    // });
  }
  //search fn.  Takes all search parameters then returns object of rooms
  static search(openTime, closeTime, duration, locations, amenities, occupants) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}vacancies/search`,
        params: {
          openTime,
          closeTime,
          duration,
          locations,
          amenities,
          occupants
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          Authorization,

        }
      }).then((response) => {
        //parseJWT
        //if(TEST) {
          response.data.push({
            "room": {
              "id": "Kimmel42069",
              "vendorId": 123,
              "name": "420-69",
              "locationId": "KIMMEL",
              "amenities": [
                {
                  "name": "Coffee",
                  "id": 12
                }
              ],
              "capacity": 5
            },
            "times": [
              {
                "openTime": "2007-04-05T12:30-02:00",
                "duration": 1,
                "closeTime": "2007-04-05T13:30-02:00"
              },
              {
                "openTime": "2007-04-05T09:30-02:00",
                "duration": 1,
                "closeTime": "2007-04-05T10:30-02:00"
              },
            ]
          });
        //}

        resolve(response.data);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  static getLocs() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}locations`,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',

        }
      }).then((response) => {
        const idArray = ['BOBST', 'KIMMEL'];
        // for(var a=0; a<response.data.length; a++){
        //   idArray.push(response.data[a].id);
        //   //console.log(response.data[a].id)
        // }
        const results = {
          data: [...response.data, {
            "name": "Kimmel Student Center",
            "id": 'KIMMEL',
            "message": "This location is under construction. Room reservations at this location is only accessible for entrepreneurial activities.",
            "defaultAmenities": [
              {
                "name": "Coffee",
                "id": 12
              }
            ],
            "address": "70 Washington Square S, New York, NY 10012",
            "campus": "wsq",
            "latitude": 40.729619,
            "longitude": -73.997025
          }],
          idArray: idArray,
        }
        resolve(results);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  static getLocInfo(loc) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}locations/${loc}`,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      }).then((response) => {
          // todo: 'parseJWT(response.token)': 9,
        resolve(response.data);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  static makeReservation(userInfo, vendorId, roomId, vendorRoomId, locationId,
    openTime, reserveTime, duration, occupants, supplementaryFields) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${url}reservations`,
        data: {
          "username": userInfo.username,
          "name": userInfo.name,
          "email": userInfo.email,
          "id": userInfo.id,
          "vendorId": vendorId,
          "roomId": roomId,
          "vendorRoomId": vendorRoomId,
          "locationId": locationId,
          "openTime": openTime,
          "reserveTime": reserveTime,
          "duration": duration,
          "occupants": occupants,
          "alternates": userInfo.alternates,
          "supplementaryFields": supplementaryFields
        },
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',

        },
      }).then((response) => {
        // parse jwt
        const results = {
           data: response.data,
        }
        // return reservation data
        resolve(results.data);
      }).catch((error) => {
        console.log(error);
        reject(error.message);
      });
    });
  }

  static getUsersReservations() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}users/reservations`,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',

        },
      }).then((response) => {
        const results = {
           data: response.data,
        }
        console.log(response.data);
        resolve(results.data);
      }).catch((error) => {
        console.log(error);
        reject(error.message);
      });
    });
  }

  static getUsersSavedFields() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${url}users/answeredQuestions`,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',

        },
      }).then((response) => {
          //todo 'parseJWT(response.token)': 9,

        console.log(response.data);
        resolve(response.data);
      }).catch((error) => {
        console.log(error);
        reject(error.message);
      });
    });
  }

  static saveUserAnswer(questionObj) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${url}users/answeredQuestions`,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'data': questionObj.data,
        },
      }).then((response) => {
        const results = {
          'parseJWT(response.token)': 9,
           data: response.data,
        }
        console.log(response);
        resolve(results.data);
      }).catch((error) => {
        console.log(error);
        reject(error.message);
      });
    });
  }


}
