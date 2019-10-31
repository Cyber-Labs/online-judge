import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../Loading';
import NavbarAdmin from '../NavbarAdmin';

class ManageContests extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { contests, toggleCreateContestModal } = this.props;
    if (contests.isLoading) return <Loading />;
    const contestList = Array.prototype.map.call(contests.contests, contest => {
      const { id, name, startTime, endTime, status, numParticipants } = contest;
      return (
        <ListGroupItem key={id.toString()}>
          <Row>
            <Col lg={2} className="text-center">
              {name}
            </Col>
            <Col lg={5} className="text-center">
              {status === 2
                ? 'Contest has ended'
                : `${new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(
                    new Date(Date.parse(startTime))
                  )} - ${new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  }).format(new Date(Date.parse(endTime)))}`}
            </Col>
            <Col lg={3} className="text-center">
              No. of Participants : &nbsp;
              {numParticipants}
            </Col>
            <Col lg={2} className="text-center">
              <Link to={`manage-contests/${id}`}>
                <Button color="info">
                  <i className="fa fa-eye" />
                  &nbsp; View
                </Button>
              </Link>
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
    return (
      <>
        <NavbarAdmin />
        <div className="container row-content">
          <ListGroup>{contestList}</ListGroup>
          <br />
          <Col className="text-center">
            <Button color="success" onClick={toggleCreateContestModal}>
              <i className="fa fa-plus-circle" />
              &nbsp; Create contest
            </Button>
          </Col>
        </div>
      </>
    );
  }
}

ManageContests.propTypes = {
  contests: PropTypes.shape({
    contests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        about: PropTypes.string,
        username: PropTypes.string,
        status: PropTypes.number.isRequired,
        numParticipants: PropTypes.number.isRequired
      })
    ).isRequired,
    isLoading: PropTypes.any,
    errMess: PropTypes.string.isRequired
  }).isRequired,
  toggleCreateContestModal: PropTypes.func.isRequired
};

export default ManageContests;
