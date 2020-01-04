import React, { Component } from 'react';
import Login from './LoginComponent.js';
import Signup from './SignupComponent.js';
import { Tab, Tabs } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='container'>
        <div className='row mt-4 pb-5 align-items-center'>
          <div className=' col-md-6 mt-4'>
            <h1>ONLINE JUDGE</h1>
          </div>

          <div className=' col-lg-6 sm-12 mt-4'>
            <br />
            <br />
            <br />
            <br />

            <Tabs defaultActiveKey='login' id='uncontrolled-tab-example'>
              <Tab eventKey='login' title='Log In '>
                <div>
                  <Login />
                </div>
              </Tab>
              <Tab eventKey='signup' title='Sign Up'>
                <div>
                  <Signup />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
