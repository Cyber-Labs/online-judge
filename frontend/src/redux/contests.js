import * as ActionTypes from './ActionTypes';

const Contests = (
  state = { isLoading: true, errMess: null, contests: [] },
  action
) => {
  let contest;
  let newcontest;
  let resp;
  switch (action.type) {
    case ActionTypes.ADD_CONTESTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        contests: action.payload
      };

    case ActionTypes.CONTESTS_LOADING:
      return { ...state, isLoading: true, errMess: null, contests: [] };

    case ActionTypes.CONTESTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_CONTEST:
      contest = action.payload;
      return { ...state, contests: state.contests.concat(contest) };

    case ActionTypes.EDIT_CONTEST:
      newcontest = action.payload;
      return {
        ...state,
        contests: state.contests.map(Contest => {
          if (Contest.id === newcontest.id) {
            return newcontest;
          }
          return contest;
        })
      };

    case ActionTypes.DELETE_CONTEST:
      resp = action.payload;
      return {
        ...state,
        contests: state.contests.filter(Contest => {
          return Contest.id !== resp.id;
        })
      };

    default:
      return state;
  }
};
export default Contests;
