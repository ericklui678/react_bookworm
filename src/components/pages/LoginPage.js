import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component {

  // dispatch login action to reducers, so now go to ../actions/auth.js
  // if successful, return to HomePage otherwise return promise
  submit = (data) => this.props.login(data).then(() =>
    this.props.history.push('/'));

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

// dispatch action to all reducers
export default connect(null, { login })(LoginPage);
