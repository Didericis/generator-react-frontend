import React from 'react';
import { mount } from 'enzyme';
import { Field, clearSubmitErrors } from 'redux-form';
import { expect } from 'chai';

import LogIn from 'forms/log_in';
import TestProvider from 'test_utils/test_provider';

describe('<LogIn />', () => {
  def('loginFormError', null);
  def('storeState', () => ({
    form: {
      login: { error: $loginFormError }
    }
  }));

  subject('wrapper', () => mount(
    <TestProvider storeState={$storeState}>
      <LogIn />
    </TestProvider>
  ));
  def('testProvider', () => $wrapper.instance());

  context('when the email field is changed', () => {
    beforeEach(() => {
      $wrapper.find({ type: 'email', name: 'email' }).find('input').simulate('change', {
        target: { value: 't' }
      });
    });

    context('and there is a login form error', () => {
      def('loginFormError', 'asdf');

      it('dispatches the clearSubmitErrors action', () => {
        expect($testProvider.getLastAction()).to.eql(clearSubmitErrors('login'));
      });
    });

    context('and there is no login form error', () => {
      def('loginFormError', undefined);

      it('does not dispatches the clearSubmitErrors action', () => {
        expect($testProvider.getLastAction()).not.to.eql(clearSubmitErrors('login'));
      });
    });
  });
});
