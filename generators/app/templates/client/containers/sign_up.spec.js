import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { SubmissionError } from 'redux-form'

import { container } from 'containers/sign_up';

const Component = () => null;
const Container = container(Component);

describe('<SignUpContainer />', () => {
  def('container', () => mount(<Container/>));
  def('testProvider', () => $container.instance());
  subject('getProps', () => () => $container.update().find(Component).props());

  context('when the onSubmit prop is called', () => {
    def('body', {
      email: 'email',
      password: 'password'
    });
    subject('onSubmit', () => $getProps().onSubmit($body));

    context('and the signup will succeed', () => {
      beforeEach(() => {
        fetchMock.post('/api/signup', 200);
      });

      it('submits a POST request to /api/signup', () => {
        return $subject.then(() => {
          expect(fetchMock.called('/api/signup', 'POST')).to.be.true;
          expect(
            JSON.parse(fetchMock.lastCall('/api/signup', 'POST')[1].body)
          ).to.eql($body);
        });
      });
    });

    context('and the signup will not succeed', () => {
      beforeEach(() => {
        fetchMock.post('/api/signup', 400);
      });

      it('throws a submission error', () => {
        return $subject.then(
          () => { throw new Error('Unexpected resolve'); },
          (err) => {
            expect(err).to.be.instanceOf(SubmissionError);
          }
        );
      });
    });
  });
});
