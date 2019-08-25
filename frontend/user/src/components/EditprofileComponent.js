import React, { Component } from "react";

import ImageUploader from "react-images-upload";

import {
  Modal,
  ModalBody,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
      picture: "images/profile.png"
    };
    this.toggle = this.toggle.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.picture
    });
  }

  save() {}

  render() {
    return (
      <div className="container mb-5 pb-5">
        <div className="row mt-5 ">
          <div class="col text-center">
            <img
              width="250px"
              height="250px"
              src={this.state.picture}
              alt="image"
              onClick={this.toggle}
            />
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
              width="250px"
            >
              <ModalBody>
                <div className="container">
                  <div className="row ">
                    <div class="col text-center">
                      <img
                        width="150px"
                        height="150px"
                        src={this.state.picture}
                        alt="image"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div class="col text-center">
                      <ImageUploader
                        withIcon={true}
                        buttonText="Upload images"
                        onChange={this.onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                        maxFileSize={5242880}
                        withPreview
                        className="uploader"
                        name="picture"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 offset-2">
                      <Button color="danger" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </div>

                    <div className="col-4 offset-2">
                      <Button color="success" onClick={this.save}>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
        <div className="row mt-2">
          <div class="col text-center">
            <a href="#">
              <h4>Username</h4>
            </a>
          </div>
        </div>
        <div className="row">
          <div class="col ">
            <Form>
              <h3>Basic Info</h3>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Firstname"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastname">Last Name</Label>
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Last Name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="course">Course</Label>
                    <Input
                      type="text"
                      name="course"
                      id="course"
                      placeholder="Course"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="department">Department</Label>
                    <Input
                      type="text"
                      name="department"
                      id="department"
                      placeholder="Department"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="text"
                  name="address2"
                  id="bio"
                  placeholder="Maximum length 100 characters"
                />
                <br />
                <Button>Save</Button>
              </FormGroup>
              <hr />
              <br />

              <FormGroup>
                <Label for="exampleCheckbox">
                  <h3>Privacy Settings</h3>
                </Label>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="checkbox1"
                    label="not selected"
                  />
                  <CustomInput
                    type="checkbox"
                    id="checkbox2"
                    label="not selected"
                  />
                  <CustomInput
                    type="checkbox"
                    id="checkbox3"
                    label="selected"
                  />
                  <CustomInput
                    type="checkbox"
                    id="checkbox4"
                    label="selected"
                  />
                </div>
              </FormGroup>
              <br />
              <Button>Save</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Editprofile;
