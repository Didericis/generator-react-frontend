import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PublicNavigation from 'components/public_navigation';

describe('<PublicNavigation />', () => {
  subject('wrapper', () => shallow(<PublicNavigation />));

  it('displays the correct icon', () => {
    expect($wrapper.find('img').props()).to.include({
      src: '/img/logo.png'
    });
  });
});
