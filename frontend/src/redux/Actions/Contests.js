import {
  ADD_CONTEST,
  ADD_CONTESTS,
  CONTESTS_FAILED,
  CONTESTS_LOADING,
  DELETE_CONTEST,
  EDIT_CONTEST
} from '../ActionTypes';
import baseUrl from '../../baseUrl';

export const contestsLoading = () => ({
  type: CONTESTS_LOADING
});

export const contestsFailed = errmess => ({
  type: CONTESTS_FAILED,
  payload: errmess
});

export const addContests = contests => ({
  type: ADD_CONTESTS,
  payload: contests
});

export const editContestdispatch = contests => ({
  type: EDIT_CONTEST,
  payload: contests
});

export const deleteContestdispatch = resp => ({
  type: DELETE_CONTEST,
  payload: resp
});

export const addContest = contest => ({
  type: ADD_CONTEST,
  payload: contest
});

export const postContest = (name, about) => dispatch => {
  const newContest = {
    name,
    about
  };
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}contests`, {
    method: 'POST',
    body: JSON.stringify(newContest),
    headers: {
      'Content-Type': 'application/json',
      access_token: token
    },
    credentials: 'same-origin'
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        alert('Contest added successfully');
        return dispatch(addContest(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => {
      alert(`Your contest could not be added\nError: ${error.message}`);
    });
};

export const editContest = (id, name, about) => dispatch => {
  const newContest = {
    name,
    about
  };
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}contests/${id}`, {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(newContest),
    headers: {
      'Content-Type': 'application/json',
      access_token: token
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        alert('Contest edited successfully');
        return dispatch(editContestdispatch(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => {
      alert(`Your contest could not be edited\nError: ${error.message}`);
    });
};

export const deleteContest = id => dispatch => {
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}contests/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      access_token: token
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        alert('Contest deleted successfully');
        return dispatch(deleteContestdispatch(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => {
      alert(`Your contest could not be deleted\nError: ${error.message}`);
    });
};

export const fetchContests = () => dispatch => {
  dispatch(contestsLoading(true));
  return fetch(`${baseUrl}contests`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => {
      /*  if(response.success)
          {
            return  dispatch(addContests(response.results));
          }
          else {
            var error = new Error(response.error);
            throw error;
          } */
      return dispatch(addContests(response));
    })
    .catch(error => dispatch(contestsFailed(error.message)));
};
