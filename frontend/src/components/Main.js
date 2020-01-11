/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contests from './Contests';
import ManageContests from './ManageContests';
import CreateContestModal from './CreateContestModal';
import CreateGroupModal from './ManageGroups/CreateGroupModal';
import Editprofile from './User';
import Leaderboard from './Leaderboard';
import contests from '../shared/contests';
import groups from '../shared/groups';
import adminsContest from '../shared/admins';

import {
  postContest,
  fetchContests,
  editContest,
  deleteContest
} from '../redux/Actions/Contests';
import { loginUser, logoutUser, registerUser } from '../redux/Actions/Auth';
import { postQuestion, fetchQuestions } from '../redux/Actions/Questions';
import { fetchUsers, editUser, editPassword } from '../redux/Actions/Users';
import ManageContestQuestions from './RouteComponents/ManageContests/Questions';
import ManageContestInfo from './RouteComponents/ManageContests/BasicInfo';
import ManageContestAdmins from './RouteComponents/ManageContests/Admins';
import ManageContestParticipants from './RouteComponents/ManageContests/Participants';
import ManageGroups from './ManageGroups';
import ManageGroupView from './RouteComponents/ManageGroups/ViewGroup';

const mapStateToProps = state => {
  return {
    contests: state.contests,
    auth: state.auth,
    questions: state.questions,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  fetchContests: () => {
    dispatch(fetchContests());
  },
  fetchQuestions: student => {
    dispatch(fetchQuestions(student));
  },
  fetchUsers: () => {
    dispatch(fetchUsers());
  },
  postContest: (name, about) => dispatch(postContest(name, about)),
  editContest: (id, name, about) => dispatch(editContest(id, name, about)),
  deleteContest: id => dispatch(deleteContest(id)),
  loginUser: creds => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  registerUser: creds => dispatch(registerUser(creds)),
  editUser: (id, firstname, lastname, roll, email) =>
    dispatch(editUser(id, firstname, lastname, roll, email)),
  editPassword: (id, username, password) =>
    dispatch(editPassword(id, username, password)),
  postQuestion: (contestId, studentId) =>
    dispatch(postQuestion(contestId, studentId))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contests,
      isCreateContestOpen: false,
      isCreateGroupOpen: false
    };
    this.toggleCreateContestModal = this.toggleCreateContestModal.bind(this);
    this.toggleCreateGroupModal = this.toggleCreateGroupModal.bind(this);
  }

  // componentDidMount() {
  //   const { auth, fetchUsers } = this.props;
  //    fetchContests();  // REDUX
  //   if (auth.isAuthenticated && auth.userinfo.admin) {
  //     fetchUsers();
  //   }
  // }

  toggleCreateContestModal() {
    this.setState(prevState => ({
      isCreateContestOpen: !prevState.isCreateContestOpen
    }));
  }

  toggleCreateGroupModal() {
    this.setState(prevState => ({
      isCreateGroupOpen: !prevState.isCreateGroupOpen
    }));
  }

  render() {
    const { contests, isCreateContestOpen, isCreateGroupOpen } = this.state;
    const {
      // contests,
      auth,
      loginUser,
      logoutUser,
      registerUser,
      location
    } = this.props;
    // const PrivateRouteCommon = ({ component: Component, ...rest }) => (
    //   <Route
    //     {...rest}
    //     render={props =>
    //       auth.isAuthenticated ? (
    //         <Component {...props} />
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: '/home',
    //             state: { from: props.location }
    //           }}
    //         />
    //       )
    //     }
    //   />
    // );

    // const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    //   <Route
    //     {...rest}
    //     render={props =>
    //       auth.isAuthenticated && auth.userinfo.admin ? (
    //         <Component {...props} />
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: '/home',
    //             state: { from: props.location }
    //           }}
    //         />
    //       )
    //     }
    //   />
    // );

    // const PrivateRouteStudent = ({ component: Component, ...rest }) => (
    //   <Route
    //     {...rest}
    //     render={props =>
    //       auth.isAuthenticated && !auth.userinfo.admin ? (
    //         <Component {...props} />
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: '/home',
    //             state: { from: props.location }
    //           }}
    //         />
    //       )
    //     }
    //   />
    // );

    return (
      <div className='App'>
        <Header
          auth={auth}
          loginUser={loginUser}
          logoutUser={logoutUser}
          registerUser={registerUser}
        />
        <Switch location={location}>
          <Route exact path='/home' component={() => <Home />} />
          {/* <PrivateRouteCommon  */}
          <Route
            exact
            path='/contests'
            component={() => (
              <Contests
                contests={contests}
                auth={auth}
                toggleCreateContestModal={this.toggleCreateContestModal}
              />
            )}
          />
          <Route
            exact
            path='/manage-contests'
            component={() => (
              <ManageContests
                contests={contests}
                toggleCreateContestModal={this.toggleCreateContestModal}
              />
            )}
          />
          <Route
            path='/manage-contests/:contestId/questions'
            component={ManageContestQuestions}
          />
          <Route
            path='/manage-contests/:contestId/basic-info'
            component={ManageContestInfo}
          />
          <Route
            path='/manage-contests/:contestId/admins'
            component={ManageContestAdmins}
          />
          <Route
            path='/manage-contests/:contestId/participants'
            component={ManageContestParticipants}
          />
          <Route
            exact
            path='/manage-contests/:contestId'
            component={({ match }) => (
              <Redirect
                to={{
                  pathname: `/manage-contests/${match.params.contestId}/questions`
                }}
              />
            )}
          />
          <Route
            exact
            path='/manage-groups'
            component={() => (
              <ManageGroups
                groups={groups}
                toggleCreateGroupModal={this.toggleCreateGroupModal}
              />
            )}
          />
          <Route path='/manage-groups/:groupId' component={ManageGroupView} />
          <Route path='/profile' component={() => <Editprofile />} />
          <Route
            exact
            path='/leaderboard'
            component={() => <Leaderboard isPractise={false} />}
          />
          <Route
            exact
            path='/leaderboard-practise'
            component={() => <Leaderboard isPractise />}
          />
          <Redirect to='/home' />
        </Switch>
        <CreateContestModal
          isOpen={isCreateContestOpen}
          toggleModal={this.toggleCreateContestModal}
          groups={groups.groups}
        />
        <CreateGroupModal
          isOpen={isCreateGroupOpen}
          toggleModal={this.toggleCreateGroupModal}
          members={adminsContest.admins}
        />
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
    // userinfo: PropTypes.objectOf(
    //   PropTypes.shape({
    //     admin: PropTypes.bool,
    //     username: PropTypes.string
    //   })
    // ).isRequired
  }).isRequired,
  // contests: PropTypes.objectOf(
  //   PropTypes.shape({
  //     contests: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         id: PropTypes.number,
  //         name: PropTypes.string,
  //         startTime: PropTypes.string,
  //         endTime: PropTypes.string,
  //         about: PropTypes.string,
  //         username: PropTypes.string,
  //         status: PropTypes.number.isRequired
  //       })
  //      ).isRequired,
  //     isLoading: PropTypes.any,
  //     errMess: PropTypes.string.isRequired
  //   })
  // ).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  // fetchUsers: PropTypes.func.isRequired,
  // fetchContests: PropTypes.func.isRequired,
  // fetchQuestions: PropTypes.func.isRequired,
  // postContest: PropTypes.func.isRequired,
  // editContest: PropTypes.func.isRequired,
  // deleteContest: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
  // editUser: PropTypes.func.isRequired,
  // editPassword: PropTypes.func.isRequired
};

Main.defaultProps = {
  location: {
    pathname: ''
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
