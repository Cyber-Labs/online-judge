import {USERS_FAILED,USERS_LOADING,ADD_USERS,EDIT_USER,EDIT_PASSWORD} from '../ActionTypes';
import {baseUrl} from '../../baseUrl';

export const fetchUsers = () => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(usersLoading(true));
    return fetch(baseUrl+'users',{
      headers: {
        'access_token': token
      }
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
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(response => { 
      if(response.success)
        {
          return  dispatch(addUsers(response.results));
        }
        else {
          var error = new Error(response.error);
          throw error;
        }
        })
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(usersFailed(error.message)));
  }
  
export const editPassword = (_id,username,password) => (dispatch) => {
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'users/password/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify({password: password}),
      headers: {
        "Content-Type": "application/json",
        'access_token': token
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText+'\n ');
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    if(response.success)
      {
        let newCreds={username: username, password: password};
        localStorage.removeItem('creds');
        localStorage.setItem('creds', JSON.stringify(newCreds));
        alert('Password changed successfully');
        return dispatch(editPasswordDispatch(newCreds));
      }
      else {
        var error = new Error(response.error);
        throw error;
      }
      })
  .catch(error =>  {  
  alert('Your password could not be changed\nError: '+error.message); });
  }
  
  export const editUser = (_id, firstname, lastname, roll, email) => (dispatch) => {
  
    const newUser = {
  firstname: firstname,
  lastname: lastname,
  roll: roll,
  email: email  };
    const token = localStorage.getItem('token');
    return fetch(baseUrl + 'users/' + _id, {
        method: "PUT"
      //  ,     credentials: 'same-origin'
        ,      body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
          'access_token': token
        } })
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
      if(response.success)
      {
        localStorage.removeItem('userinfo');
        localStorage.setItem('userinfo', JSON.stringify(response.results));
        return dispatch(editUserdispatch(response.results)); }
      else {
        var error = new Error(response.error);
        throw error;
      }
      })
    .catch(error =>  {  
    alert('Your profile could not be edited\nError: '+error.message); });
  };

  export const addUsers = (users) => ({
    type: ADD_USERS,
    payload: users
  });
  
  export const usersLoading = () => ({
    type: USERS_LOADING
  });
    
  export const usersFailed = (errmess) => ({
    type: USERS_FAILED,
    payload: errmess
  });
  
  export const editUserdispatch = (USER) => ({
    type: EDIT_USER,
    payload: USER
  });
  
  export const editPasswordDispatch = (CREDS) => ({
    type: EDIT_PASSWORD,
    payload: CREDS
  })
  