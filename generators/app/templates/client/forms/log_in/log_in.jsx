import React, { Component } from 'react';
import { Field, clearSubmitErrors, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import Form from 'forms/form';

class LogIn extends Component {
  render() {
    const { error, warning, handleSubmit, submitting, submitSucceeded } = this.props;

    return (
      <Form error={error} warning={warning} handleSubmit={handleSubmit}>
        <Field name="email" component="input" type="email" placeholder="Email"/>
        <Field name="password" component="input" type="password" placeholder="Password"/>
        <div className='buttons'>
          <Link to='/forgot-password'>Forgot Password</Link>
          <button type="submit">Log In</button>
        </div>
      </Form>
    );
  }
}

export default compose(
  withRouter, 
  reduxForm({ 
    form: 'login',
    onChange: (values, dispatch, props) => {
      if (props.error) dispatch(clearSubmitErrors('login'));
    }
  }),
)(LogIn);
