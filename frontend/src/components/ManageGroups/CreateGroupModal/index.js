import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Badge,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  Input,
  ListGroupItem,
  ListGroup
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;

class CreateContestModal extends Component {
  constructor(props) {
    super(props);
    const { members } = props;
    this.state = {
      selectedMembers: members,
      keyword: '',
      invitedMembers: []
    };
    this.filterUsers = this.filterUsers.bind(this);
  }

  filterUsers(e) {
    const { members } = this.props;
    const key = e.target.value;
    this.setState({ keyword: key });
    const newMembersList = members.filter(member =>
      member.username.includes(key)
    );
    this.setState({ selectedMembers: newMembersList });
  }

  render() {
    const { toggleModal, isOpen } = this.props;
    const { keyword, selectedMembers, invitedMembers } = this.state;
    const membersList = selectedMembers.map((member, i) => (
      <ListGroupItem key={member.id.toString()}>
        <Row>
          <Col xs={8}>{member.username}</Col>
          <Col xs={4}>
            <Button
              onClick={() => {
                const newInvitedMembers = invitedMembers;
                Array.prototype.push.call(newInvitedMembers, member);
                const newSelectedMembers = selectedMembers;
                newSelectedMembers.splice(i, 1);
                this.setState({ selectedMembers: newSelectedMembers });
                this.setState({ invitedMembers: newInvitedMembers });
              }}
            >
              Invite
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    ));
    let invitationList;
    if (invitedMembers) {
      invitationList = Array.prototype.map.call(invitedMembers, (member, i) => (
        <Col xs={6} md={3} key={i.toString()}>
          {' '}
          <Badge color='dark'>
            {member.username}
            &nbsp;
            <i
              className='fa fa-times'
              aria-hidden='true'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const newInvitedMembers = invitedMembers;
                const newSelectedMembers = selectedMembers;
                Array.prototype.push.call(newSelectedMembers, member);
                newInvitedMembers.splice(i, 1);
                this.setState({ selectedMembers: newSelectedMembers });
                this.setState({ invitedMembers: newInvitedMembers });
              }}
            />
          </Badge>
        </Col>
      ));
    } else invitationList = '';
    return (
      <div>
        <Modal
          isOpen={isOpen}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={toggleModal}
          autoFocus
        >
          <ModalHeader toggle={toggleModal}>Create a Group</ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={values => {
                const invitedUsernames = invitedMembers.map(
                  member => member.username
                );
                const invitedMembersList = invitedUsernames.join(',');
                console.log(values);
                console.log(invitedMembersList);
                toggleModal();
              }}
            >
              <Row className='form-group'>
                <Label htmlFor='name' md={4}>
                  Group Name :&nbsp;
                </Label>
                <Col md={8}>
                  <Control.text
                    model='.name'
                    id='name'
                    name='name'
                    placeholder='Name of Group'
                    className='form-control'
                    validators={{
                      required,
                      minLength: minLength(3)
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.name'
                    show='touched'
                    messages={{
                      required: 'Required',
                      minLength: ' Must be greater than 2 characters'
                    }}
                  />
                </Col>
              </Row>
              <h5>
                {' '}
                {invitedMembers.length
                  ? 'Members invited :'
                  : 'No members invited yet'}
              </h5>
              <Row>{invitationList}</Row>
              <br />
              <Row>
                <Col xs={{ size: 2 }}>
                  <Label> Add members </Label>
                </Col>
                <Col xs={{ offset: 2, size: 8 }}>
                  <Input
                    placeholder='Search username here '
                    onChange={this.filterUsers}
                    value={keyword}
                  />
                </Col>
              </Row>

              <ListGroup>{membersList}</ListGroup>
              <br />
              <Row>
                <Col className='text-center'>
                  <Button color='danger' onClick={toggleModal}>
                    Cancel
                  </Button>
                  &nbsp;
                  <Button color='primary' type='submit'>
                    Create group
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

CreateContestModal.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      username: PropTypes.string
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default CreateContestModal;
