import { SubmissionError } from 'redux-form'
import queryString from 'query-string';
import { withProps } from 'recompose';

import SignUp from 'forms/sign_up';

export const container = withProps({
  onSubmit(body) {
    return fetch('/api/signup', { 
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
          _error: 'Sign up failed!' 
        });
      }
    })
  }
});

export default container(SignUp);
