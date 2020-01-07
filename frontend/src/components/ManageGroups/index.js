import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../Loading';
import NavbarAdmin from '../NavbarAdmin';

class ManageGroups extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { toggleCreateGroupModal, groups } = this.props;
    const { groups: groupList, isLoading, errMess } = groups;
    if (isLoading) return <Loading />;
    if (errMess) return <errMess />;
    const groupListComponent = Array.prototype.map.call(groupList, group => {
      const { id, name, admins, members } = group;
      return (
        <ListGroupItem key={id.toString()}>
          <Row>
            <Col lg={2} className='text-center'>
              {name}
            </Col>
            <Col lg={5} className='text-center'>
              No. of Participants : &nbsp;
              {members.length}
            </Col>
            <Col lg={3} className='text-center'>
              <b>Admin :</b>
              &nbsp;
              {admins[0].username}
            </Col>
            <Col lg={2} className='text-center'>
              <Link to={`/manage-groups/${id}`}>
                <Button color='info'>
                  <i className='fa fa-eye' />
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
        <div className='container row-content'>
          {groupList.length ? (
            <ListGroup>{groupListComponent}</ListGroup>
          ) : (
            <>
              <div style={{ border: '0.5px dashed gray' }}>
                <br />
                <h5 className='text-center'>You are not a part of any group</h5>
                <br />
              </div>
              <br />
              <br />
            </>
          )}

          <br />
          <Col className='text-center'>
            <Button color='success' onClick={toggleCreateGroupModal}>
              <i className='fa fa-plus-circle' />
              &nbsp; Create a new group
            </Button>
          </Col>
        </div>
      </>
    );
  }
}

ManageGroups.propTypes = {
  groups: PropTypes.shape({
    groups: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ).isRequired,
    isLoading: PropTypes.any,
    errMess: PropTypes.string.isRequired
  }).isRequired,
  toggleCreateGroupModal: PropTypes.func.isRequired
};

export default ManageGroups;
