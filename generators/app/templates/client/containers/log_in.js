import queryString from 'query-string';
import { withProps } from 'recompose';
import { SubmissionError } from 'redux-form'

import LogIn from 'forms/log_in';

export const container = withProps({
  onSubmit(body) {
    return fetch('/api/login', { 
      method: 'POST', 
      credentials: 'same-origin',
      body: JSON.stringify(body), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.status >= 400) {
        throw new SubmissionError({ 
          password: 'Invalid Credentials', 
          _error: 'Log in failed!' 
        });
      }
    });
  },
});

export default container(LogIn);
