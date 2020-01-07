/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Row,
  Col,
  InputGroup,
  Button,
  Popover,
  PopoverBody
} from 'reactstrap';
import uuid from 'uuid';
import Loading from '../../Loading';
import NavbarAdmin from '../../NavbarAdmin';
import InviteMemberModal from '../InviteMemberModal';

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false,
      newName: '',
      isInviteModalOpen: false,
      isPopoverOpen: false,
      selectedUserId: 'members',
      selectedUser: null
    };
    this.toggleContestNameEdit = this.toggleContestNameEdit.bind(this);
    this.toggleInviteModal = this.toggleInviteModal.bind(this);
    this.togglePopver = this.togglePopver.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleInviteModal() {
    const { isInviteModalOpen } = this.state;
    this.setState({ isInviteModalOpen: !isInviteModalOpen });
  }

  toggleContestNameEdit() {
    const { isEditOpen } = this.state;
    this.setState({ isEditOpen: !isEditOpen });
  }

  togglePopver() {
    const { isPopoverOpen } = this.state;
    this.setState({ isPopoverOpen: !isPopoverOpen });
  }

  makeAdmin() {
    const { selectedUser } = this.state;
    console.log('Send request to server to make admin', selectedUser);
  }

  removeMember() {
    const { selectedUser } = this.state;
    console.log('Send request to server to remove member', selectedUser);
  }

  render() {
    const {
      isEditOpen,
      newName,
      isInviteModalOpen,
      isPopoverOpen,
      selectedUserId
    } = this.state;
    const { group, isLoading, errMess } = this.props;
    const { name, admins, members } = group;
    if (isLoading) return <Loading />;
    if (errMess) return <h3>{errMess}</h3>;
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
                      paddingBottom: '20px'
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
          <br />
          <h5 style={{ color: 'black' }}> Admins : </h5>
          <Row>
            {admins.map(({ pic, username, name: adminName }) => {
              const uniqueId = uuid.v4();
              return (
                <React.Fragment key={uniqueId}>
                  <Col xs={12} sm={6} lg={3}>
                    <img
                      src={pic}
                      id={uniqueId}
                      style={{
                        width: '100px',
                        float: 'left',
                        paddingBottom: '10px',
                        paddingRight: '10px'
                      }}
                      alt={adminName}
                    />
                    <h5 style={{ color: 'black' }}>
                      &nbsp;
                      {adminName}
                    </h5>
                    <h6>
                      &nbsp;
                      {username}
                    </h6>
                  </Col>
                  <br />
                </React.Fragment>
              );
            })}
          </Row>
          <br />
          <h5 style={{ color: 'black' }} id='members'>
            {' '}
            All members :&nbsp;
            {members.length}
            &nbsp;&nbsp;
            <Button
              className='btn btn-success'
              onClick={this.toggleInviteModal}
            >
              <i className='fa fa-plus-circle' />
              &nbsp; Invite
            </Button>
          </h5>
          <br />
          <Row>
            {members.map(({ pic, username, name: memberName }, i) => {
              const uniqueId = uuid.v4();
              return (
                <React.Fragment key={uniqueId}>
                  <Col
                    xs={12}
                    sm={6}
                    lg={3}
                    onMouseEnter={() => {
                      this.setState({ selectedUserId: username + i });
                      this.setState({
                        selectedUser: { pic, username, name: memberName }
                      });
                    }}
                    onMouseLeave={() => {
                      this.setState({ selectedUserId: 'members' });
                      this.setState({
                        selectedUser: null
                      });
                    }}
                  >
                    <img
                      src={pic}
                      id={username + i}
                      style={{
                        width: '100px',
                        float: 'left',
                        paddingBottom: '10px',
                        paddingRight: '10px',
                        cursor: 'pointer'
                      }}
                      alt={memberName}
                    />
                    <h5 style={{ color: 'black' }}>
                      &nbsp;
                      {memberName}
                    </h5>
                    <h6>
                      &nbsp;
                      {username}
                    </h6>
                    <Button
                      style={{
                        padding: '.15rem .2rem',
                        fontSize: '.700rem',
                        lineHeight: '.3',
                        borderRadius: '.1rem'
                      }}
                      onClick={() => {
                        this.makeAdmin();
                      }}
                      className={`btn btn-success btn-sm  ${
                        selectedUserId === username + i ? '' : 'd-none'
                      }`}
                    >
                      <i className='fa fa-check' />
                      &nbsp; Make admin
                    </Button>
                    &nbsp;
                    <Button
                      style={{
                        padding: '.15rem .2rem',
                        fontSize: '.700rem',
                        lineHeight: '.3',
                        borderRadius: '.1rem'
                      }}
                      className={`btn btn-danger btn-sm ${
                        selectedUserId === username + i ? '' : 'd-none'
                      }`}
                      onClick={() => {
                        this.removeMember();
                      }}
                    >
                      <i className='fa fa-times' />
                      &nbsp; Remove
                    </Button>
                  </Col>
                  <br />
                </React.Fragment>
              );
            })}
          </Row>
          <br />
          <InviteMemberModal
            isOpen={isInviteModalOpen}
            toggleModal={this.toggleInviteModal}
            members={members}
          />
        </div>
        <Popover
          placement='bottom'
          isOpen={isPopoverOpen}
          target={selectedUserId}
          toggle={this.togglePopver}
        >
          <PopoverBody className='text-center' />
        </Popover>
      </>
    );
  }
}

ViewGroup.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    admins: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        name: PropTypes.string,
        pic: PropTypes.string
      })
    ).isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        name: PropTypes.string,
        pic: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errMess: PropTypes.string.isRequired
};

export default ViewGroup;
