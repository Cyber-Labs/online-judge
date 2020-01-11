/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Row, Col, InputGroup, Media } from 'reactstrap';
import NavbarAdmin from '../../NavbarAdmin';
import ContestNavPills from '../ContestNavPills';
import Loading from '../../Loading';
import adminsContest from '../../../shared/admins';
import UserInfo from './UserInfo';
import '../styles.css';

class ManageContestsAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false,
      newName: '',
      adminContest: adminsContest
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
    const { adminContest } = this.state;
    const { isLoading, errMess, admins } = adminContest;

    const toggleAdmin = adminId => {
      const newAdminsContest = adminContest;
      newAdminsContest.admins = admins.map(admin => {
        if (admin.id !== adminId) return admin;
        const newAdmin = admin;
        newAdmin.isAdmin = !admin.isAdmin;
        return newAdmin;
      });
      this.setState({ adminContest: newAdminsContest });
    };

    const creators = Array.prototype.filter.call(
      admins,
      admin => admin.isCreator
    );
    const nonCreators = Array.prototype.filter.call(
      admins,
      admin => !admin.isCreator
    );
    const { isEditOpen, newName } = this.state;
    const { contest } = this.props;
    const { name, id } = contest;
    return (
      <>
        <NavbarAdmin />
        <div className='container row-content'>
          {isEditOpen ? (
            <Row>
              <Col md={5}>
                <InputGroup>
                  <Input
                    type='text'
                    name='contestName'
                    id='contestName'
                    placeholder={name}
                    defaultValue={name}
                    style={{ display: 'inline' }}
                  />
                  &nbsp;
                  <br />
                  <h6
                    className='option'
                    onClick={() => {
                      this.toggleContestNameEdit();
                    }}
                    style={{
                      display: 'inline',
                      color: 'blue',
                      paddingTop: '10px'
                    }}
                    onKeyDown={this.toggleContestNameEdit}
                    role='button'
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
                className='option'
                onClick={this.toggleContestNameEdit}
                style={{ display: 'inline', color: 'blue' }}
                onKeyDown={this.toggleContestNameEdit}
                role='button'
              >
                <u>Edit</u>
              </h6>
            </>
          )}
          <hr />
          <ContestNavPills contestId={id} activeTab='Administrator' />
          <br />
          <Row>
            <Col md={8}>
              {isLoading ? <Loading /> : ''}
              {errMess ? <h4>{errMess}</h4> : ''}
              {!isLoading && !errMess ? (
                <Media list>
                  <UserInfo user={creators[0]} toggleAdmin={toggleAdmin} />
                  <br />
                  {nonCreators.map(admin => (
                    <>
                      <UserInfo
                        user={admin}
                        key={admin.id.toString()}
                        toggleAdmin={toggleAdmin}
                      />
                      <br />
                    </>
                  ))}
                </Media>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Button color='primary' style={{ marginLeft: '50px' }}>
            Add moderator
          </Button>
          <br />
          <Button color='success' className='save-btn'>
            Save
          </Button>
        </div>
      </>
    );
  }
}

ManageContestsAdmins.propTypes = {
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

export default ManageContestsAdmins;
