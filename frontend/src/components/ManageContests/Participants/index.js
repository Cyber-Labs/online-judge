/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Row, Col, InputGroup } from 'reactstrap';
import NavbarAdmin from '../../NavbarAdmin';
import ContestNavPills from '../ContestNavPills';
import '../styles.css';

class ManageContestsParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false,
      newName: ''
    };
    this.toggleContestNameEdit = this.toggleContestNameEdit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleContestNameEdit() {
    const { isEditOpen } = this.state;
    this.setState({ isEditOpen: !isEditOpen });
  }

  render() {
    const { isEditOpen, newName } = this.state;
    const { contest } = this.props;
    const { name, id } = contest;
    return (
      <>
        <NavbarAdmin />
        <div className="container row-content">
          {isEditOpen ? (
            <Row>
              <Col md={5}>
                <InputGroup>
                  <Input
                    type="text"
                    name="contestName"
                    id="contestName"
                    placeholder={name}
                    defaultValue={name}
                    style={{ display: 'inline' }}
                  />
                  &nbsp;
                  <br />
                  <h6
                    className="option"
                    onClick={() => {
                      this.toggleContestNameEdit();
                    }}
                    style={{
                      display: 'inline',
                      color: 'blue',
                      paddingTop: '10px'
                    }}
                    onKeyDown={this.toggleContestNameEdit}
                    role="button"
                  >
                    <u>Done</u>
                  </h6>
                </InputGroup>
              </Col>
            </Row>
          ) : (
            <>
              <h2 style={{ display: 'inline' }}>
                {newName || name}
                &nbsp;
              </h2>
              <h6
                className="option"
                onClick={this.toggleContestNameEdit}
                style={{ display: 'inline', color: 'blue' }}
                onKeyDown={this.toggleContestNameEdit}
                role="button"
              >
                <u>Edit</u>
              </h6>
            </>
          )}
          <hr />
          <ContestNavPills contestId={id} activeTab="Participants" />
          <br />

          <br />
          <Button color="success" className="save-btn">
            Save
          </Button>
        </div>
      </>
    );
  }
}

ManageContestsParticipants.propTypes = {
  contest: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    about: PropTypes.string,
    username: PropTypes.string,
    status: PropTypes.number.isRequired,
    numParticipants: PropTypes.number.isRequired
  }).isRequired
};

export default ManageContestsParticipants;
