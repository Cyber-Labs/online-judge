/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  FormGroup,
  Row,
  Col,
  Label,
  InputGroup
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';
import NavbarAdmin from '../../NavbarAdmin';
import ContestNavPills from '../ContestNavPills';
import '../styles.css';

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;

class ManageContestsInfo extends Component {
  constructor(props) {
    super(props);
    const { contest } = this.props;
    const { startTime, endTime } = contest;
    const defaultStart = new Date(Date.parse(startTime));
    const defaultEnd = new Date(Date.parse(endTime));
    this.state = {
      isEditOpen: false,
      newName: '',
      selectedGroups: [],
      startTime: defaultStart.getTime(),
      endTime: defaultEnd.getTime()
    };
    this.toggleContestNameEdit = this.toggleContestNameEdit.bind(this);
    this.changeEndTime = this.changeEndTime.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange(e) {
    const { selectedGroups } = this.state;
    const options = selectedGroups;
    let pos = -1;
    let i = 0;
    for (; i < options.length; i += 1) {
      if (options[i] === e.target.value) {
        pos = i;
        break;
      }
    }
    if (e.target.checked) {
      if (pos === -1) options.push(e.target.value);
    } else if (pos !== -1) options.splice(pos, 1);
    this.setState({ selectedGroups: options });
  }

  changeEndTime(e) {
    this.setState({
      endTime: e.target.value
    });
  }

  changeStartTime(s, e) {
    let start;
    let end;
    if (s > e) {
      [start, end] = [e, s];
    } else {
      [start, end] = [s, e];
    }
    this.setState({
      startTime: start,
      endTime: end
    });
    // }
  }

  toggleContestNameEdit() {
    const { isEditOpen } = this.state;
    this.setState({ isEditOpen: !isEditOpen });
  }

  render() {
    const {
      isEditOpen,
      newName,
      startTime,
      endTime,
      selectedGroups
    } = this.state;
    const { contest, groups } = this.props;
    const { name, id, about, confidential } = contest;
    const groupsList = groups.map(group => (
      <Col
        xs={{ offset: 1, size: 11 }}
        md={{ offset: 1, size: 5 }}
        lg={{ offset: 1, size: 3 }}
        key={group.id.toString()}
      >
        <Label check htmlFor={group.id}>
          <Input
            type="checkbox"
            onChange={this.onChange}
            id={group.id}
            value={group.id}
            name="group_id"
          />
          {group.name}
        </Label>
      </Col>
    ));
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
          <ContestNavPills contestId={id} activeTab="Basic Info" />
          <br />
          <LocalForm
            onSubmit={values => {
              const selectedGroupList = selectedGroups.join(',');
              /* this.postContest(values.type, values.name, values.about, values.rules,
                 values.prizes, selectedGroups, values.confidential, startTime,
                 endTime);
                */
              console.log(values);
              console.log(selectedGroupList);
              console.log(startTime);
              console.log(endTime);
            }}
          >
            <Row className="form-group">
              <Col md={4}>
                <Label htmlFor="type">Contest Type : </Label>
              </Col>
              <Col md={8}>
                <Control.select
                  defaultValue="contest"
                  model=".type"
                  id="type"
                  className="form-control"
                >
                  <option>Contest</option>
                  <option>Assignment</option>
                  <option>Lab Exam</option>
                  <option>Practise Test</option>
                </Control.select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label> Groups eligible for contest :</Label>
              </Col>
            </Row>
            <Row className="form-group">{groupsList}</Row>
            <br />
            <Row>
              <Label htmlFor="about" md={4}>
                About contest :&nbsp;
              </Label>
              <Col md={8}>
                <Control.textarea
                  model=".about"
                  id="about"
                  name="about"
                  placeholder="About contest"
                  className="form-control"
                  defaultValue={about}
                  validators={{
                    required,
                    minLength: minLength(21)
                  }}
                  rows="4"
                />
                <Errors
                  className="text-danger"
                  model=".about"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: ' Must be greater than 20 characters'
                  }}
                />
                <br />
              </Col>
            </Row>
            <Row>
              <Label htmlFor="rules" md={4}>
                Rules :&nbsp;
              </Label>
              <Col md={8}>
                <Control.textarea
                  model=".rules"
                  id="rules"
                  name="rules"
                  placeholder="Rules for the contest"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(21)
                  }}
                  rows="4"
                />
                <Errors
                  className="text-danger"
                  model=".rules"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: ' Must be greater than 20 characters'
                  }}
                />
                <br />
              </Col>
            </Row>
            <Row>
              <Label htmlFor="prizes" md={4}>
                Prizes&nbsp;
              </Label>
              <Col md={8}>
                <Control.textarea
                  model=".prizes"
                  id="prizes"
                  name="prizes"
                  placeholder="If applicable"
                  className="form-control"
                  rows="3"
                />
              </Col>
              <br />
            </Row>
            <Row>
              <Col className="text-center">
                <br />
                <h6 className="font-weight-bolder">
                  Choose start time and end time
                  <br />
                  (24-hour clock):
                </h6>
              </Col>
            </Row>
            <Row>
              <Col
                className="text-center"
                sm={{ offset: 3, size: 3 }}
                md={{ offset: 4, size: 2 }}
              >
                <Calendar
                  onChange={this.changeStartTime}
                  startDate={startTime}
                  endDate={endTime}
                  displayTime
                  range
                  timezone="Asia/Kolkata"
                  disableDates={date => date < new Date().getTime()}
                />
                <br />
              </Col>
            </Row>
            <Row>
              <FormGroup check inline style={{ width: '100vw' }}>
                <br />
                <Col style={{ display: 'inline' }}>
                  <Control.checkbox
                    model=".confidential"
                    id="confidential"
                    name="confidential"
                    className="form-control"
                    defaultValue={confidential}
                    style={{ marginLeft: '30%' }}
                  />
                </Col>
                <Col style={{ display: 'inline' }}>
                  <Label check htmlFor="confidential">
                    &nbsp; Keep contest confidential until start time
                  </Label>
                </Col>
                <br />
              </FormGroup>
            </Row>
            <Row>
              <Col className="text-center">
                <br />
                <br />
                <Button color="success" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </LocalForm>
          <br />
        </div>
      </>
    );
  }
}

ManageContestsInfo.propTypes = {
  contest: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    about: PropTypes.string,
    username: PropTypes.string,
    status: PropTypes.number.isRequired,
    numParticipants: PropTypes.number.isRequired,
    confidential: PropTypes.bool.isRequired
  }).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
};

export default ManageContestsInfo;
