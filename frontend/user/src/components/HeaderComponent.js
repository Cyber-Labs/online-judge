import React, { Component } from "react";
import {
  Row,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Form,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      dropdownOpen: false
    };
  }

  handleSubmit(values) {
    this.props.postFeedback(values);
    this.props.resetFeedbackForm();
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <div>
        <Navbar dark expand="lg">
          <div className="container">
            {!this.props.auth.isAuthenticated ? (
              <NavbarToggler onClick={this.toggleNav} />
            ) : (
              <div />
            )}
            <NavbarBrand className="mr-auto ml-4 " href="/">
              <img
                src="images/logo.jpg"
                height="30"
                width="41"
                alt="ONLINE JUDGE"
              />
              &nbsp; ONLINE JUDGE
            </NavbarBrand>
            {!this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className="nav-link ml-3" to="/home">
                        <span /> Contests{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link ml-3" to="/aboutus">
                        <span /> Practice
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link ml-3" to="/menu">
                        <span /> Leaderboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link ml-3" to="/contactus">
                        <span /> Forum
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <Form
                        model="search"
                        onSubmit={values => this.handleSubmit(values)}
                      >
                        <Row className="form-group ml-2 ">
                          <NavItem class="ml-2">
                            <input
                              id="search"
                              name="search"
                              placeholder="Search"
                              className="form-control"
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
                      model="search"
                      onSubmit={values => this.handleSubmit(values)}
                    >
                      <Row className="form-group">
                        <NavItem>
                          <NavLink className="nav-link" to="/notifications">
                            <span>
                              <i class="fa fa-bell fa-md ml-4" />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className="nav-link">
                            <span>
                              <Dropdown
                                isOpen={this.state.dropdownOpen}
                                toggle={this.toggle}
                              >
                                <DropdownToggle tag="a" caret>
                                  <i class="fa fa-user fa-md ml-4" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem tag={Link} to="/profile">
                                    Profile
                                  </DropdownItem>
                                  <DropdownItem tag={Link} to="/home">
                                    Manage
                                  </DropdownItem>

                                  <DropdownItem tag={Link} to="/profile">
                                    Change Password
                                  </DropdownItem>
                                  <DropdownItem tag={Link} to="/profile">
                                    Account Settings
                                  </DropdownItem>
                                  <DropdownItem tag={Link} to="/profile">
                                    SignOut
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </span>{" "}
                          </NavLink>
                        </NavItem>
                      </Row>
                    </Form>
                  </NavItem>
                </Nav>
              </React.Fragment>
            ) : (
              <div />
            )}
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;
