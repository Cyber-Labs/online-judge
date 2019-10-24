import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  ListGroup
} from 'reactstrap';
import CarouselShared from '../Carousel';
import Loading from '../Loading';
import RenderActive from './ActiveList';
import RenderPast from './PastList';
import RenderUpcoming from './UpcomingList';
import CreateContestModal from './CreateContestModal';
import carouselSlides from './CarouselSlides';

class Contests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Active',
      remainingTimes: [],
      selectedContest: -1,
      isModalOpen: false
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.countdown = [];
    const { contests } = this.props;
    if (contests.contests && contests.contests.length) {
      const active = Array.prototype.filter.call(
        contests.contests,
        contest => contest.status === 1
      );
      active.forEach((contest, i) => {
        this.countdown[i] = window.setInterval(() => {
          this.timer(i, contest.endTime);
        }, 1000);
      });
    }
  }

  componentWillUnmount() {
    this.countdown.forEach(countdown => {
      clearInterval(countdown);
    });
  }

  toggleModal() {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  }

  toggleTab(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
        selectedContest: -1
      });
    }
  }

  timer(i, endTime) {
    const { remainingTimes } = this.state;
    const newTimes = remainingTimes;
    const timeDifference =
      new Date(Date.parse(endTime)).getTime() - new Date(Date.now()).getTime();
    newTimes[i] = timeDifference > 0 ? timeDifference : 0;
    this.setState({ remainingTimes: newTimes });
  }

  render() {
    const {
      remainingTimes,
      selectedContest,
      activeTab,
      isModalOpen
    } = this.state;
    const { contests, auth } = this.props;
    const groups = [
      {
        id: 0,
        name: 'B.Tech (CSE)'
      },
      {
        id: 1,
        name: 'Dual Degree (CSE)'
      },
      {
        id: 2,
        name: 'Integrated M.Tech (MnC)'
      }
    ];
    let activeContests;
    let pastContests;
    let upcomingContests;
    let activeList;
    let pastList;
    let upcomingList;
    if (contests.contests && contests.contests.length) {
      activeContests = Array.prototype.filter.call(
        contests.contests,
        contest => contest.status === 1
      );
      activeList = activeContests.map((contest, i) => {
        return (
          <div
            key={contest.id.toString()}
            onClick={() => {
              this.setState({ selectedContest: contest.id });
            }}
            onKeyDown={() => {
              this.setState({ selectedContest: contest.id });
            }}
            role="button"
            tabIndex={i.toString()}
          >
            <RenderActive
              contest={contest}
              remainingTime={remainingTimes[i]}
              selectedContest={selectedContest}
            />
          </div>
        );
      });
      pastContests = Array.prototype.filter.call(
        contests.contests,
        contest => contest.status === 2
      );
      pastList = pastContests.map((contest, i) => {
        return (
          <div
            key={contest.id.toString()}
            onClick={() => {
              this.setState({ selectedContest: contest.id });
            }}
            onKeyDown={() => {
              this.setState({ selectedContest: contest.id });
            }}
            role="button"
            tabIndex={i.toString()}
          >
            <RenderPast contest={contest} selectedContest={selectedContest} />
          </div>
        );
      });
      upcomingContests = Array.prototype.filter.call(
        contests.contests,
        contest => contest.status === 0
      );
      upcomingList = upcomingContests.map((contest, i) => {
        return (
          <div
            key={contest.id.toString()}
            onClick={() => {
              this.setState({ selectedContest: contest.id });
            }}
            onKeyDown={() => {
              this.setState({ selectedContest: contest.id });
            }}
            role="button"
            tabIndex={i.toString()}
          >
            <RenderUpcoming
              contest={contest}
              selectedContest={selectedContest}
            />
          </div>
        );
      });
    }
    return (
      <div className="align-self-center pb-2">
        <CarouselShared items={carouselSlides} />
        <div className="container">
          <div className="row row-content">
            {contests.isLoading ? <Loading /> : ''}
            {!contests.isLoading && contests.errMess ? (
              <h4>{contests.errMess}</h4>
            ) : (
              ''
            )}
            {!contests.isLoading && !contests.errMess ? (
              <>
                <Nav>
                  <NavItem>
                    <h5>
                      <Badge
                        className="option pill"
                        color={activeTab === 'Active' ? 'dark' : ''}
                        size="xl"
                        pill
                        onClick={() => {
                          this.toggleTab('Active');
                        }}
                      >
                        Active
                      </Badge>
                    </h5>
                  </NavItem>
                  <NavItem>
                    <h5>
                      <Badge
                        className="option pill"
                        color={activeTab === 'Upcoming' ? 'dark' : ''}
                        size="xl"
                        pill
                        onClick={() => {
                          this.toggleTab('Upcoming');
                        }}
                      >
                        Upcoming
                      </Badge>
                    </h5>
                  </NavItem>
                  <NavItem>
                    <h5>
                      <Badge
                        className="option pill"
                        color={activeTab === 'Past' ? 'dark' : ''}
                        size="xl"
                        pill
                        onClick={() => {
                          this.toggleTab('Past');
                        }}
                      >
                        Past
                      </Badge>
                    </h5>
                  </NavItem>
                </Nav>
                {auth.isAuthenticated && !auth.userinfo.admin ? (
                  <Nav
                    className={window.innerWidth > 358 ? 'ml-auto' : 'mx-auto'}
                  >
                    <NavItem>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={this.toggleModal}
                      >
                        <i className="fa fa-plus" />
                        &nbsp; Create contest
                      </Button>
                    </NavItem>
                    <CreateContestModal
                      isOpen={isModalOpen}
                      toggleModal={this.toggleModal}
                      groups={groups}
                    />
                  </Nav>
                ) : (
                  ' '
                )}
                <div className="container">
                  <br />
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="Active">
                      <ListGroup className="list-group-hoverable">
                        {activeList}
                      </ListGroup>
                    </TabPane>
                    <TabPane tabId="Upcoming">
                      <ListGroup className="list-group-hoverable">
                        {upcomingList}
                      </ListGroup>
                    </TabPane>
                    <TabPane tabId="Past">
                      <ListGroup className="list-group-hoverable">
                        {pastList}
                      </ListGroup>
                    </TabPane>
                  </TabContent>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

Contests.propTypes = {
  contests: PropTypes.shape({
    contests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        about: PropTypes.string,
        username: PropTypes.string,
        status: PropTypes.number.isRequired
      })
    ).isRequired,
    isLoading: PropTypes.any,
    errMess: PropTypes.string.isRequired
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userinfo: PropTypes.objectOf(
      PropTypes.shape({
        admin: PropTypes.bool,
        username: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default Contests;
