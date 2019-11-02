/* eslint-disable react/prop-types */
import React from 'react';
import contests from '../../../shared/contests';
import Home from '../../Home';
import ManageContestsParticipants from '../../ManageContests/Participants';

const ManageContestParticipants = ({ match }) => {
  const selectedContest = contests.contests.filter(
    contest => contest.id.toString() === match.params.contestId
  )[0];
  // let notFoundErr = null;
  if (selectedContest === undefined) {
    return <Home />;
  }
  return <ManageContestsParticipants contest={selectedContest} />;
};

export default ManageContestParticipants;
