import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NotFound from 'components/not_found';

describe('<NotFound />', () => {
  subject('wrapper', () => shallow(<NotFound />));

  it('displays the correct text', () => {
    expect($wrapper.text()).to.eql('Not Found');
  });
});
