/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Row,
  Col,
  InputGroup
} from 'reactstrap';
import Loading from '../../Loading';
import NavbarAdmin from '../../NavbarAdmin';
import questions from '../../../shared/questions';
import ContestNavPills from '../ContestNavPills';
import '../styles.css';

class ManageContestsQuestions extends Component {
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
    if (questions.isLoading) return <Loading />;
    const questionList = Array.prototype.map.call(
      questions.questions,
      question => {
        const {
          id: questionId,
          name: questionName,
          type,
          difficulty,
          maxScore
        } = question;
        return (
          <ListGroupItem key={questionId.toString()}>
            <Row>
              <span
                className="fa fa-times option"
                style={{ paddingLeft: '96%' }}
              />

              <Col lg={9}>
                <h5>{questionName}</h5>
                <h6>
                  {type === 1 ? 'MCQ' : ''}
                  {type === 2 ? 'Subjective' : ''}
                  {type === 3 ? 'Programming' : ''}
                </h6>
                <br />
                <b>Difficulty :</b>
                &nbsp;
                {difficulty}
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                <b>Max Score :</b>
                &nbsp;
                {maxScore}
              </Col>
              <Col lg={3} className="text-center">
                <br />
                <Button color="info">
                  <i className="fa fa-pencil" />
                  &nbsp; Edit
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        );
      }
    );
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
            <h2 style={{ display: 'inline' }}>
              {newName || name}
              &nbsp;
              <h6
                className="option"
                onClick={this.toggleContestNameEdit}
                style={{ display: 'inline', color: 'blue' }}
                onKeyDown={this.toggleContestNameEdit}
                role="button"
              >
                <u>Edit</u>
              </h6>
            </h2>
          )}
          <hr />
          <ContestNavPills contestId={id} activeTab="Questions" />
          <ListGroup>{questionList}</ListGroup>
          <br />
          <Col className="text-center">
            <Button color="success">
              <i className="fa fa-plus-circle" />
              &nbsp; Add question
            </Button>
          </Col>
          <br />
          <Button color="success" className="save-btn">
            Save
          </Button>
        </div>
      </>
    );
  }
}

ManageContestsQuestions.propTypes = {
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

export default ManageContestsQuestions;
