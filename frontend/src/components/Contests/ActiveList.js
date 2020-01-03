import React from 'react';
import PropTypes from 'prop-types';
import { Button, Media, ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderActive(props) {
  const { remainingTime, contest, selectedContest } = props;
  const { id, name, about, username, startTime, endTime } = contest;
  const year = Math.floor(remainingTime / (1000 * 3600 * 24 * 365));
  const months = Math.floor(remainingTime / (1000 * 3600 * 24 * 30)) % 12;
  const days = Math.floor(remainingTime / (1000 * 3600 * 24)) % 31;
  const hour = Math.floor(remainingTime / (1000 * 3600)) % 24;
  const min = Math.floor(remainingTime / (1000 * 60)) % 60;
  const sec = Math.floor(remainingTime / 1000) % 60;
  return (
    <>
      <ListGroupItem className="option">
        <Media list={window.innerWidth < 540}>
          <Media>
            <Media
              object
              src="images/trophy-cup.jpg"
              alt="Generic placeholder image"
            />
          </Media>
          <Media body>
            <Row className="align-items-center">
              <Col md={8}>
                <Media heading>{name}</Media>
                <Row>
                  <Col sm={6}>
                    <p className="small">
                      Start Time :&nbsp;
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      }).format(new Date(Date.parse(startTime)))}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p className="small">
                      End Time:&nbsp;
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      }).format(new Date(Date.parse(endTime)))}
                    </p>
                  </Col>
                </Row>
                <h5 className="font-weight-bolder text-danger">
                  Contest ends in :&nbsp;
                  {year && year === 1 ? `${year} year ` : ''}
                  {year && year !== 1 ? `${year} years ` : ''}
                  {months && months === 1 ? `${months} month ` : ''}
                  {months && months !== 1 ? `${months} months ` : ''}
                  {days && days === 1 ? `${days} day ` : ''}
                  {days && days !== 1 ? `${days} days ` : ''}
                  {hour && hour === 1 ? `${hour} hour ` : ''}
                  {hour && hour !== 1 ? `${hour} hours ` : ''}
                  {min && min === 1 ? `${min} min ` : ''}
                  {min && min !== 1 ? `${min} mins ` : ''}
                  {sec && sec === 1 ? `${sec} sec ` : ''}
                  {sec && sec !== 1 ? `${sec} secs ` : ''}
                </h5>
                <p
                  className={
                    selectedContest === id ? 'd-block small' : 'd-none'
                  }
                >
                  {about}
                </p>
                <Row>
                  <Col md={6}>
                    <p className="lead small">
                      Created By :&nbsp;
                      {username}
                    </p>
                  </Col>
                  <Col md={6}>
                    <Link to="/contests">
                      <p
                        className={
                          selectedContest === id
                            ? 'd-none'
                            : 'd-block lead small'
                        }
                      >
                        Leaderboard
                      </p>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="text-center">
                <Button color="primary">
                  <i className="fa fa-sign-in" />
                  &nbsp;Participate
                </Button>
                <div
                  className={
                    selectedContest === id ? 'd-block small' : 'd-none'
                  }
                >
                  &nbsp;
                  <br />
                  <Button color="success">
                    <i className="fa fa-list" />
                    &nbsp; Leaderboard
                  </Button>
                </div>
              </Col>
            </Row>
          </Media>
        </Media>
      </ListGroupItem>
    </>
  );
}

RenderActive.propTypes = {
  contest: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      about: PropTypes.string,
      username: PropTypes.string,
      status: 1
    })
  ).isRequired,
  selectedContest: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired
};

export default RenderActive;
