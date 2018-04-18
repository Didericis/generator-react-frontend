import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MainLayout from 'components/main_layout';

const Komponent = () => <h1>Hi</h1>;

describe('<MainLayout />', () => {
  subject('wrapper', () => shallow(
    <MainLayout>
      <Komponent />
    </MainLayout>
  ));

  it('renders the children', () => {
    expect($wrapper.find(Komponent).exists()).to.be.true;
  });
});
