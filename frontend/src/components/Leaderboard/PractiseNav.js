import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';

class PractiseNav extends Component {
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
                <NavItem
                  style={{
                    marginTop: '10px',
                    marginLeft: '30%',
                    width: '40%'
                  }}
                >
                  <h4 style={{ color: 'white', width: '700px' }}>Practise</h4>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}

export default PractiseNav;
