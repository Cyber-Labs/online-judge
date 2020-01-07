import {
  QUESTIONS_FAILED,
  QUESTIONS_LOADING,
  ADD_QUESTION,
  ADD_QUESTIONS,
  EDIT_QUESTION
} from '../ActionTypes';
import baseUrl from '../../baseUrl';

export const questionsLoading = () => ({
  type: QUESTIONS_LOADING
});

export const questionsFailed = errmess => ({
  type: QUESTIONS_FAILED,
  payload: errmess
});

export const addQuestions = questions => ({
  type: ADD_QUESTIONS,
  payload: questions
});

export const editQuestiondispatch = contests => ({
  type: EDIT_QUESTION,
  payload: contests
});

export const fetchQuestions = () => dispatch => {
  const token = localStorage.getItem('token');
  dispatch(questionsLoading(true));
  return fetch(`${baseUrl}questions`, {
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
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        return dispatch(addQuestions(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => dispatch(questionsFailed(error.message)));
};

export const addQuestion = question => ({
  type: ADD_QUESTION,
  payload: question
});

export const postQuestion = (contestId, studentId) => dispatch => {
  const newQuestion = {
    contest: contestId,
    student: studentId
  };
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}questions`, {
    method: 'POST',
    body: JSON.stringify(newQuestion),
    headers: {
      'Content-Type': 'application/json',
      access_token: token
    }
    //   ,        credentials: "same-origin"
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
        alert('Question added successfully');
        return dispatch(addQuestion(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => {
      alert(`Question couldn't be added\nError: ${error.message}`);
    });
};

export const editQuestion = (id, name, about) => dispatch => {
  const newContest = {
    name,
    about
  };
  const token = localStorage.getItem('token');
  return fetch(`${baseUrl}question/${id}`, {
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
        alert('Question edited successfully');
        return dispatch(editQuestiondispatch(response.results));
      }
      const error = new Error(response.error);
      throw error;
    })
    .catch(error => {
      alert(`Your question could not be edited\nError: ${error.message}`);
    });
};
