import axios from 'axios';
import { create } from 'domain';
import { Promise } from 'q';
import router from '../router';



let http = axios.create({
    // baseURL: "http://localhost:8080",
    withCredentials: true,
    // timeout: 5000
    
    // headers: {
    //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     // 'Content-Type': 'application/json;charset=utf-8'
    // },
    // transformRequest: [function(data){
    //     let newData = '';
    //     for (let k in data) {
    //     if (data.hasOwnProperty(k) === true) {
    //         newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
    //     }
    //     }
    // return newData;
    // }]
});

http.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  let pathName = location.hash.replace('#','');
  if(localStorage.getItem('token')){
      if(pathName != '/' && pathName != '/login'){
          config.headers.Authorization  = localStorage.getItem('token');
      }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
    return response;
}, error => {
  if(error.response){
    switch (error.response.status){
      case 401:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        break;
      case 403:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        break;
    }
    return Promise.reject(error.response.status);
  }
});

function apiAxios(method, url, params, response) {
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
      response(res);
    }).catch(function (err) {
      response(err);
    })
  }
  
  export default {
    get: function (url, params, response) {
      return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
      return apiAxios('POST', url, params, response)
    },
    put: function (url, params, response) {
      return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
      return apiAxios('DELETE', url, params, response)
    }
  }