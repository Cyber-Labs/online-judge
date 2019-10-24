import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormGroup,
  Row,
  Col,
  Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;

class CreateContestModal extends Component {
  constructor(props) {
    const today = new Date();
    super(props);
    this.state = {
      selectedGroups: [],
      startTime: today.getTime() + 1000 * 3600 * 2,
      endTime: today.getTime() + 1000 * 3600 * 5
    };
    this.changeEndTime = this.changeEndTime.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.onChange = this.onChange.bind(this);
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
    if (!end) {
      this.setState({
        startTime: start,
        endTime: start + 1000 * 3600
      });
    } else {
      this.setState({
        startTime: start,
        endTime: end
      });
    }
  }

  render() {
    const { toggleModal, groups, isOpen } = this.props;
    const { startTime, endTime, selectedGroups } = this.state;
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
      <div>
        <Modal
          isOpen={isOpen}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={toggleModal}
          autoFocus
        >
          <ModalHeader toggle={toggleModal}>Create a Contest</ModalHeader>
          <ModalBody>
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
                toggleModal();
              }}
            >
              <Row className="form-group">
                <Col md={4}>
                  <Label htmlFor="type">Choose contest type : </Label>
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
                <Col xs={{ offset: 1, size: 11 }} md={{ offset: 2, size: 8 }}>
                  <Label> Select the groups eligible for contest :</Label>
                </Col>
              </Row>
              <Row className="form-group">{groupsList}</Row>
              <br />
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Contest Title :&nbsp;
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Name of Contest"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: ' Must be greater than 2 characters'
                    }}
                  />
                </Col>
              </Row>
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
                  <h6 className="font-weight-bolder">
                    &nbsp; Choose start time and end time
                    <br />
                    (24-hour clock):
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col className="text-center" md={{ offset: 3, size: 6 }}>
                  <Calendar
                    onChange={this.changeStartTime}
                    startDate={startTime}
                    endDate={endTime}
                    displayTime
                    timezone="Asia/Kolkata"
                    disableDates={date => date < new Date().getTime()}
                  />
                </Col>
              </Row>
              <Row>
                <FormGroup check inline>
                  <br />
                  <Col md={2}>
                    <Control.checkbox
                      model=".confidential"
                      id="confidential"
                      name="confidential"
                      className="form-control"
                      defaultValue={false}
                    />
                  </Col>
                  <Col md={10}>
                    <Label check htmlFor="confidential">
                      &nbsp; Keep contest confidential until start time
                    </Label>
                  </Col>
                  <br />
                </FormGroup>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button color="danger" onClick={toggleModal}>
                    Cancel
                  </Button>
                  &nbsp;
                  <Button color="primary" type="submit">
                    Create contest
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
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default CreateContestModal;
