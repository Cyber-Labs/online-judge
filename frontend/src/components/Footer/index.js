import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <p className="footer" align="center">
        © Copyright 2019 Cyberlabs
      </p>
    );
  }
}

export default Footer;
