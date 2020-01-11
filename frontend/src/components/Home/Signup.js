import React, { Component } from 'react';
import { Label, Input, FormGroup, Button, Col } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;
const validEmail = val =>
  /^[a-z]+\.[0-9]{2}[a-z]{2}[0-9]{4}@([a-z]{2,4}\.)?iitism\.ac\.in$/i.test(val);
const invalid = (password, confirmPassword) => password === confirmPassword;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
    // this.handleRegister = this.handleRegister.bind(this);
  }

  // handleRegister() {}

  render() {
    const { password } = this.state;
    const { confirmPassword } = this.state;

    return (
      <LocalForm model='user' onSubmit={this.handleRegister}>
        <br />
        <h4>Join (IIT-ISM Online Judge)</h4>
        <br />
        <FormGroup row>
          <Label htmlFor='name' sm={2}>
            Name:
          </Label>
          <Col>
            <Control.text
              sm={10}
              model='.name'
              id='name'
              name='name'
              className='form-control'
              placeholder='Name'
              validators={{
                required
              }}
            />
            <Errors
              className='text-danger'
              model='.name'
              show='touched'
              messages={{
                required: 'Required'
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='Email' sm={2}>
            Email:
          </Label>
          <Col sm={10}>
            <Control.text
              sm={10}
              model='.email'
              id='email'
              name='email'
              className='form-control'
              placeholder='abc.123@xy.iitism.ac.in'
              validators={{
                required,
                validEmail
              }}
            />
            <Errors
              className='text-danger'
              model='.email'
              show='touched'
              messages={{
                required: 'Required',
                validEmail: 'Enter the work E-mail of IIT-ISM'
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='username' sm={2}>
            Username:
          </Label>
          <Col>
            <Control.text
              sm={10}
              model='.username'
              id='username'
              name='username'
              className='form-control'
              placeholder='Name'
              validators={{
                required
              }}
            />
            <Errors
              className='text-danger'
              model='.username'
              show='touched'
              messages={{
                required: 'Required'
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='branch' sm={2}>
            Branch
          </Label>
          <Col sm={10}>
            <Input type='select' name='branch' id='branch'>
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>Dual Degree</option>
              <option>Integrated B.Tech and M.Tech</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='department' sm={2}>
            department
          </Label>
          <Col sm={10}>
            <Input type='select' name='department' id='department'>
              <option>Electrical Engineering</option>
              <option>Computer Science and Engineering</option>
              <option>Electronics Engineering</option>
              <option>Applied Mathematics</option>
              <option>Applied Physics </option>
              <option>Mechanical Engineering</option>
              <option>Civil Engineering</option>
              <option>Chemical Engineering</option>
              <option>Environmental Science and Engineering</option>
              <option>Mining Engineering</option>
              <option>Petroleum Engineering</option>
              <option>Humanities and Social Science Engineering</option>
              <option>Management Studies</option>
              <option>Fuel and Mineral Engineering </option>
              <option>Mining Machinery Engineering</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='Password' sm={2}>
            Password:
          </Label>
          <Col sm={10}>
            <Control.text
              sm={10}
              model='.password'
              id='Password'
              type='password'
              name='Password'
              className='form-control'
              placeholder='******'
              validators={{
                required,
                minLength: minLength(8)
              }}
            />

            <Errors
              className='text-danger'
              model='.password'
              show='touched'
              messages={{
                required: 'Required',
                minLength: 'Password should be atleast 8 characters'
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='confirmPassword' sm={2}>
            Confirm Password:
          </Label>
          <Col sm={10}>
            <Control.text
              sm={10}
              model='.confirmPassword'
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              className='form-control'
              placeholder='******'
              validators={{
                required,
                invalid: invalid({ password }, { confirmPassword })
              }}
            />

            <Errors
              className='text-danger'
              model='.confirmPassword'
              show='touched'
              messages={{
                required: 'Required   ',
                invalid: "Passwords don't match"
              }}
            />
          </Col>
        </FormGroup>

        <br />
        <Button type='submit' value='submit' color='primary'>
          Sign Up
        </Button>
      </LocalForm>
    );
  }
}

export default Signup;
