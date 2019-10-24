import * as ActionTypes from './ActionTypes';

const Contests = (
  state = { isLoading: true, errMess: null, contests: [] },
  action
) => {
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
      var contest = action.payload;
      return { ...state, contests: state.contests.concat(contest) };

    case ActionTypes.EDIT_CONTEST:
      var newcontest = action.payload;
      return {
        ...state,
        contests: state.contests.map(contest => {
          if (contest._id === newcontest._id) {
            return newcontest;
          }
          return contest;
        })
      };

    case ActionTypes.DELETE_CONTEST:
      var resp = action.payload;
      return {
        ...state,
        contests: state.contests.filter(contest => {
          return contest._id !== resp._id;
        })
      };

    default:
      return state;
  }
};
export default Contests;
