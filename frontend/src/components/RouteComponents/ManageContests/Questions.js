/* eslint-disable react/prop-types */
import React from 'react';
import contests from '../../../shared/contests';
import Home from '../../Home';
import ManageContestsQuestions from '../../ManageContests/Questions';

const ManageContestQuestions = ({ match }) => {
  const selectedContest = contests.contests.filter(
    contest => contest.id.toString() === match.params.contestId
  )[0];
  // let notFoundErr = null;
  if (selectedContest === undefined) {
    return <Home />;
  }
  return <ManageContestsQuestions contest={selectedContest} />;
};

export default ManageContestQuestions;
