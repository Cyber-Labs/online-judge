import {LOGIN_REQUEST,LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT_REQUEST,LOGOUT_SUCCESS} from '../ActionTypes';
import {baseUrl} from '../../baseUrl';
import {fetchUsers} from './Users';

export const requestLogin = (creds) => {
    return {
        type: LOGIN_REQUEST,
        creds
    }
  }
  
  export const receiveLogin = (response) => {
    return {
        type: LOGIN_SUCCESS,
        token: response.token,
        userinfo: response.userinfo
    }
  }
  
  export const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        message
    }
  }
  
  export const loginUser = (creds) => (dispatch) => {
  
    dispatch(requestLogin(creds));
    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.results.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('userinfo', JSON.stringify(response.results.userinfo));    
              dispatch(fetchUsers())
           // Dispatch the success action
            dispatch(receiveLogin(response.results));
        }
        else {
            var error = new Error(response.error);
            error.response = response;
            throw error;
        }
    })
    .catch(error => {
      alert(error.message);
       return dispatch(loginError(error.message));})
  };
  
  export const registerUser = (creds) => (dispatch) => {
    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If Registration was successful, alert the user
            alert('Registration Successful');
          }
        else {
            var error = new Error(response.error);
            error.response = response;
            throw error;
        }
    })
    .catch(error => alert('Error : '+error.message))
  }; 
  
  export const requestLogout = () => {
    return {
      type: LOGOUT_REQUEST
    }
  }
  
  export const receiveLogout = () => {
    return {
      type: LOGOUT_SUCCESS
    }
  }
  
  
  export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');  
    localStorage.removeItem('userinfo');  
    dispatch(receiveLogout())
  }
  