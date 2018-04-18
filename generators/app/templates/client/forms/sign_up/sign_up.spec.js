import React from 'react';
import { mount } from 'enzyme';
import { Field, clearSubmitErrors } from 'redux-form';
import { expect } from 'chai';

import SignUp from 'forms/sign_up';
import TestProvider from 'test_utils/test_provider';

describe('<SignUp />', () => {
  def('signUpFormError', null);
  def('storeState', () => ({
    form: {
      signUp: { error: $signUpFormError }
    }
  }));

  subject('wrapper', () => mount(
    <TestProvider storeState={$storeState}>
      <SignUp />
    </TestProvider>
  ));
  def('testProvider', () => $wrapper.instance());

  context('when the email field is changed', () => {
    beforeEach(() => {
      $wrapper.find({ type: 'email', name: 'email' }).find('input').simulate('change', {
        target: { value: 't' }
      });
    });

    context('and there is a signUp form error', () => {
      def('signUpFormError', 'asdf');

      it('dispatches the clearSubmitErrors action', () => {
        expect($testProvider.getLastAction()).to.eql(clearSubmitErrors('signUp'));
      });
    });

    context('and there is no signUp form error', () => {
      def('signUpFormError', undefined);

      it('does not dispatches the clearSubmitErrors action', () => {
        expect($testProvider.getLastAction()).not.to.eql(clearSubmitErrors('signUp'));
      });
    });
  });
});
