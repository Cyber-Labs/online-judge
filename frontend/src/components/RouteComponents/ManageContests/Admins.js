/* eslint-disable react/prop-types */
import React from 'react';
import contests from '../../../shared/contests';
import Home from '../../Home';
import ManageContestsAdmins from '../../ManageContests/Admins';

const ManageContestAdmins = ({ match }) => {
  const selectedContest = contests.contests.filter(
    contest => contest.id.toString() === match.params.contestId
  )[0];
  // let notFoundErr = null;
  if (selectedContest === undefined) {
    return <Home />;
  }
  return <ManageContestsAdmins contest={selectedContest} />;
};

export default ManageContestAdmins;
