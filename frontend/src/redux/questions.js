import * as ActionTypes from './ActionTypes';

const Questions = (
  state = { isLoading: true, errMess: null, questions: [] },
  action
) => {
  let question;
  let newquestion;
  switch (action.type) {
    case ActionTypes.ADD_QUESTIONS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        questions: action.payload
      };

    case ActionTypes.QUESTIONS_LOADING:
      return { ...state, isLoading: true, errMess: null, questions: [] };

    case ActionTypes.QUESTIONS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_QUESTION:
      question = action.payload;
      return { ...state, questions: state.questions.concat(question) };

    case ActionTypes.EDIT_QUESTION:
      newquestion = action.payload;
      return {
        ...state,
        questions: state.questions.map(Question => {
          if (Question.id === newquestion.id) {
            return newquestion;
          }
          return question;
        })
      };

    default:
      return state;
  }
};
export default Questions;
