import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Form
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(values) {
    console.log(values); // Search in all contest and questions
  }

  toggleNav() {
    this.setState(({ isNavOpen }) => ({
      isNavOpen: !isNavOpen
    }));
  }

  toggleModal() {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }));
  }

  render() {
    const { auth } = this.props;
    const { isNavOpen } = this.state;
    return (
      <div className='align-items-center'>
        <Navbar dark expand='lg' fixed='top'>
          <div className='container'>
            {auth.isAuthenticated ? (
              <NavbarToggler onClick={this.toggleNav} />
            ) : (
              <div />
            )}
            <NavbarBrand className='mr-auto brand' href='/'>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
                height='30'
                width='41'
                alt='ONLINE JUDGE'
              />
              &nbsp; ONLINE JUDGE
            </NavbarBrand>
            {auth.isAuthenticated ? (
              <>
                <Collapse isOpen={isNavOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className='nav-link ml-3' to='/contests'>
                        <span />
                        &nbsp; Contests &nbsp;
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link ml-3' to='/coming_soon'>
                        <span />
                        &nbsp; Practice
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link ml-3' to='/coming_soon'>
                        <span />
                        &nbsp; Leaderboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className='nav-link ml-3' to='/coming_soon'>
                        <span />
                        &nbsp; Forum
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <Form
                        model='search'
                        onSubmit={values => this.handleSubmit(values)}
                      >
                        <Row className='form-group ml-2 '>
                          <NavItem className='ml-2'>
                            <input
                              id='search'
                              name='search'
                              placeholder='Search'
                              className='form-control'
                            />
                          </NavItem>
                        </Row>
                      </Form>
                    </NavItem>
                  </Nav>
                </Collapse>
                <Nav navbar>
                  <NavItem>
                    <Form
                      model='search'
                      onSubmit={values => this.handleSubmit(values)}
                    >
                      <Row className='form-group'>
                        <NavItem>
                          <NavLink className='nav-link' to='/notifications'>
                            <span>
                              <i className='fa fa-bell fa-md ml-4' />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className='nav-link' to='/profile'>
                            <span>
                              <i className='fa fa-user fa-md ml-4' />
                            </span>
                            &nbsp;
                          </NavLink>
                        </NavItem>
                      </Row>
                    </Form>
                  </NavItem>
                </Nav>
              </>
            ) : (
              <div />
            )}
          </div>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
    // userinfo: PropTypes.objectOf(
    //   PropTypes.shape({
    //     admin: PropTypes.bool,
    //     username: PropTypes.string
    //   })
    // ).isRequired
  }).isRequired
};
export default Header;
