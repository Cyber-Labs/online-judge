import React, { Component } from 'react';
import { Label, Input, FormGroup, Button, Col } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';

const required = val => val && val.length;

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   modal: false
  //   // };
  //   //   this.handleSubmit = this.handleSubmit.bind(this);
  //   //   this.toggle = this.toggle.bind(this);
  // }

  // handleSubmit() {}

  //   toggle() {
  //     this.setState(prevState => ({
  //       modal: !prevState.modal
  //     }));
  //   }

  render() {
    return (
      <LocalForm model='userlogin' onSubmit={this.handleSubmit}>
        <br />
        <h4>Login to (IIT-ISM Online Judge)</h4>
        <br />
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
        <br />
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
                required
              }}
            />

            <Errors
              className='text-danger'
              model='.password'
              show='touched'
              messages={{
                required: 'Required'
              }}
            />
          </Col>
        </FormGroup>

        <div className='row'>
          <div className='col-4'>
            <div
              role='button'
              tabIndex={0}
              onClick={() => this.toggle()}
              onKeyDown={() => this.toggle()}
            >
              Forgot Password?
            </div>
          </div>
          <div className='col-4 ml-auto'>
            <FormGroup check>
              <Label check>
                <Input
                  type='checkbox'
                  name='remember'
                  innerRef={input => {
                    this.remember = input;
                  }}
                />
                Remember me
              </Label>
            </FormGroup>
          </div>
        </div>
        <br />
        <Button type='submit' value='submit' color='primary'>
          Login
        </Button>
      </LocalForm>
    );
  }
}

export default Login;
