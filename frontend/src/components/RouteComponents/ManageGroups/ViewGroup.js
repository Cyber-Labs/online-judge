/* eslint-disable react/prop-types */
import React from 'react';
import Home from '../../Home';
import ViewGroup from '../../ManageGroups/ViewGroup';
import groups from '../../../shared/groups';

const ManageGroupView = ({ match }) => {
  const selectedGroup = groups.groups.filter(
    group => group.id.toString() === match.params.groupId
  )[0];
  // let notFoundErr = null;
  if (selectedGroup === undefined) {
    return <Home />;
  }
  return <ViewGroup group={selectedGroup} isLoading={false} errMess='' />;
};

export default ManageGroupView;
