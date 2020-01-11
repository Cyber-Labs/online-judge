import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';

import { NavLink } from 'react-router-dom';

class ContestNav extends Component {
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
                <NavItem onClick={this.toggleNav}>
                  <NavLink
                    className='nav-link '
                    to='/contests'
                    style={{ color: 'white' }}
                  >
                    <i className='fa fa-chevron-left' />
                    &nbsp; Back to contest
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    marginTop: '10px',
                    marginLeft: '30%',
                    width: '40%'
                  }}
                >
                  <h4 style={{ color: 'white', width: '700px' }}>
                    Contest Name
                  </h4>
                  <h6 style={{ color: ' #a6a6a6' }}>- ProblemSetter1</h6>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}

export default ContestNav;
