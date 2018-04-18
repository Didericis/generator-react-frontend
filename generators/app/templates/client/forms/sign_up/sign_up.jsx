import React, { Component } from 'react';
import { Field, clearSubmitErrors, reduxForm } from 'redux-form';

import Form from 'forms/form';

class SignUp extends Component {
  render() {
    const { error, handleSubmit, submitting, submitSucceeded } = this.props;

    return (
      <Form error={error} handleSubmit={handleSubmit}>
        <Field name="email" component="input" type="email" placeholder="Email"/>
        <Field name="password" component="input" type="password" placeholder="Password"/>
        <Field name="confirmPassword" component="input" type="password" placeholder="Confirm Password"/>
        <div className='buttons'>
          <button type="submit">Sign Up</button>
        </div>
      </Form>
    );
  }
}

export default reduxForm({ 
  form: 'signUp',
  onChange: (values, dispatch, props) => {
    if (props.error) dispatch(clearSubmitErrors('signUp'));
  }
})(SignUp);
