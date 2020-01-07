import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';

import { NavLink } from 'react-router-dom';

class NavbarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    if (window.innerWidth <= 768) {
      const { isNavOpen } = this.state;
      this.setState({
        isNavOpen: !isNavOpen
      });
    }
  }

  render() {
    const { isNavOpen } = this.state;

    return (
      <>
        <Navbar
          dark
          color='secondary'
          expand='md'
          style={{ marginTop: '55px' }}
        >
          <div className='container'>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={isNavOpen} navbar>
              <Nav navbar>
                <NavItem className='ml-2' onClick={this.toggleNav}>
                  <NavLink className='nav-link' to='/manage-contests'>
                    &nbsp; Contests
                  </NavLink>
                </NavItem>
                <NavItem className='ml-2' onClick={this.toggleNav}>
                  <NavLink className='nav-link' to='/manage-questions'>
                    &nbsp;Questions
                  </NavLink>
                </NavItem>
                <NavItem className='ml-2' onClick={this.toggleNav}>
                  <NavLink className='nav-link ' to='/manage-roadmaps'>
                    &nbsp;Roadmaps
                  </NavLink>
                </NavItem>
                <NavItem className='ml-2' onClick={this.toggleNav}>
                  <NavLink className='nav-link ' to='/manage-articles'>
                    &nbsp;Articles
                  </NavLink>
                </NavItem>
                <NavItem className='ml-2' onClick={this.toggleNav}>
                  <NavLink className='nav-link ' to='/manage-groups'>
                    &nbsp;Groups
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}

export default NavbarAdmin;
