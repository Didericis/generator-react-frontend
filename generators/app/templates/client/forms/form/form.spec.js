import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Form as ReduxForm } from 'redux-form';

import Form from 'forms/form';

const Komponent = () => null;

describe('<Form />', () => {
  def('error', null);
  def('warning', null);
  def('props', () => ({
    error: $error,
    warning: $warning,
    handleSubmit: sandbox.stub()
  }));
  subject('wrapper', () => shallow(
    <Form {...$props}>
      <Komponent />
    </Form>
  ));

  it('passes handleSubmit to ReduxForm', () => {
    expect($wrapper.find(ReduxForm).props()).to.include({
      onSubmit: $props.handleSubmit
    });
  });

  it('renders children', () => {
    expect($wrapper.find(Komponent).exists()).to.be.true;
  });

  context('when there is a warning', () => {
    def('warning', 'something');

    it('displays a form warning', () => {
      expect($wrapper.find({ name: 'form-warning' }).text()).to.eql($warning);
    });
  });

  context('when there is an error', () => {
    def('error', 'something');

    it('displays an error', () => {
      expect($wrapper.find({ name: 'form-error' }).text()).to.eql($error);
    });
  });
});
