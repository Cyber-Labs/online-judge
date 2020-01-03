import React from 'react';
import PropTypes from 'prop-types';
import { Button, Media, ListGroupItem, Row, Col } from 'reactstrap';

function RenderUpcoming(props) {
  const { contest, selectedContest } = props;
  const { id, name, about, username, startTime, endTime } = contest;
  return (
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
              <h6>
                Start time:&nbsp;
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                }).format(new Date(Date.parse(startTime)))}
              </h6>
              <h6>
                End time: &nbsp;
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                }).format(new Date(Date.parse(endTime)))}
              </h6>
              <p
                className={selectedContest === id ? 'd-block small' : 'd-none'}
              >
                {about}
              </p>
              <p className="lead small">
                Created By : &nbsp;
                {username}
              </p>
            </Col>
            <Col md={4} className="text-center">
              <Button color="primary">
                <i className="fa fa-sign-in" />
                &nbsp; Participate
              </Button>
              <div
                className={selectedContest === id ? 'd-block small' : 'd-none'}
              >
                &nbsp;
                <br />
                <Button color="success">
                  <i className="fa fa-futbol-o" />
                  &nbsp; Practise
                </Button>
              </div>
            </Col>
          </Row>
        </Media>
      </Media>
    </ListGroupItem>
  );
}

RenderUpcoming.propTypes = {
  contest: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      about: PropTypes.string,
      username: PropTypes.string,
      status: 0
    })
  ).isRequired,
  selectedContest: PropTypes.number.isRequired
};

export default RenderUpcoming;
