import React from 'react';
import PropTypes from 'prop-types';
import { Button, Media, ListGroupItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderPast(props) {
  const { contest, selectedContest } = props;
  const { id, name, about, username } = contest;
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
              <Row className="container">
                Contest has ended
                <br />
              </Row>
              <p
                className={selectedContest === id ? 'd-block small' : 'd-none'}
              >
                {about}
              </p>
              <p
                className={selectedContest === id ? 'd-none' : 'd-block small'}
              >
                {`${String.prototype.slice.call(about, 0, 170)} ..... `}
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
                        selectedContest === id ? 'd-none' : 'd-block lead small'
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
                <i className="fa fa-eye-o" />
                &nbsp;View questions
              </Button>
              <div
                className={selectedContest === id ? 'd-block small' : 'd-none'}
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
  );
}

RenderPast.propTypes = {
  contest: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      about: PropTypes.string,
      username: PropTypes.string,
      status: 2
    })
  ).isRequired,
  selectedContest: PropTypes.number.isRequired
};

export default RenderPast;
