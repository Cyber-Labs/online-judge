/* eslint-disable react/prop-types */
import React from 'react';
import contests from '../../../shared/contests';
import Home from '../../Home';
import ManageContestsInfo from '../../ManageContests/BasicInfo';
import groups from '../../../shared/groups';

const ManageContestInfo = ({ match }) => {
  const { groups: groupsList } = groups;
  const selectedContest = contests.contests.filter(
    contest => contest.id.toString() === match.params.contestId
  )[0];
  // let notFoundErr = null;
  if (selectedContest === undefined) {
    return <Home />;
  }
  return <ManageContestsInfo contest={selectedContest} groups={groupsList} />;
};

export default ManageContestInfo;
