import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Authentication from 'components/authentication';
import LogIn from 'containers/log_in';
import SignUp from 'containers/sign_up';

describe('<Authentication />', () => {
  subject('wrapper', () => shallow(<Authentication />));

  it('renders the LogIn container', () => {
    expect($wrapper.find(LogIn).exists()).to.be.true;
  });

  it('renders the SignUp container', () => {
    expect($wrapper.find(SignUp).exists()).to.be.true;
  });
});
