import React, { Component } from "react";
import Header from "./HeaderComponent.js";
import Footer from "./FooterComponent.js";
import Home from "./HomeComponent.js";
import Editprofile from "./EditprofileComponent.js";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postContest,
  fetchContests,
  editContest,
  deleteContest
} from "../redux/Actions/Contests";
import { loginUser, logoutUser, registerUser } from "../redux/Actions/Auth";
import { postQuestion, fetchQuestions } from "../redux/Actions/Questions";
import { fetchUsers, editUser, editPassword } from "../redux/Actions/Users";

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
  componentDidMount() {
    this.props.fetchContests();
    if (this.props.auth.isAuthenticated && this.props.auth.userinfo.admin) {
      this.props.fetchUsers();
    }
  }

  render() {
    const PrivateRouteCommon = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth.isAuthenticated && this.props.auth.userinfo.admin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    const PrivateRouteStudent = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth.isAuthenticated && !this.props.auth.userinfo.admin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    return (
      <div className="App">
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          registerUser={this.props.registerUser}
        />
        <Switch location={this.props.location}>
          <Route exact path="/home" component={() => <Home />} />

          <Route path="/profile" component={() => <Editprofile />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
