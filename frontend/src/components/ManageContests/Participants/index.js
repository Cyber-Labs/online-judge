/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Row, Col, InputGroup } from 'reactstrap';
import Table from 'react-responsive-data-table';
import NavbarAdmin from '../../NavbarAdmin';
import ContestNavPills from '../ContestNavPills';
import '../styles.css';
import participants from '../../../shared/participants';

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
          <ContestNavPills contestId={id} activeTab='Participants' />
          <br />
          <Table
            style={{
              opacity: 0.8,
              backgroundColor: 'blue',
              color: '#ffffff',
              textAlign: 'center'
            }}
            tableStyle='table table-hover table-striped table-bordered table-borderless table-responsive'
            pages
            pagination
            onRowClick={() => {}} // if You Want Table Row Data OnClick then assign this {row => console.log(row)}
            page
            errormsg='Error. . .'
            loadingmsg='Loading. . .'
            isLoading={false}
            sort
            title='Participants'
            search
            size={5}
            data={{
              head: {
                rank: 'Rank',
                username: 'Username',
                name: 'Name',
                num_attempted: 'No. of questions attempted',
                num_solved: 'No. of questions solved',
                score: 'Total score'
              },
              data: participants
            }}
          />
          <br />
          <Button color='info'>Download database</Button>
          <Button color='success' className='save-btn'>
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
