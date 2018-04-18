import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LogIn from 'containers/log_in';
import SignUp from 'containers/sign_up';
<%_ if (baseStyles) { _%>
import styles from './authentication.css';
<%_ } _%>

const Authentication = ({ className, style }) => (
<%_ if (baseStyles) { _%>
  <div className={classNames(styles.main, className)} style={style}>
    <div className={styles.info}>
<%_ } else { _%>
  <div className='authentication'>
    <div className='authentication__info'>
<%_ } _%>
      <h1>Welcome!</h1>
    </div>
<%_ if (baseStyles) { _%>
    <div className={styles.forms}>
<%_ } else { _%>
    <div className='authentication__form'>
<%_ } _%>
      <LogIn />
      <SignUp />
    </div>
  </div>
);

Authentication.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Authentication;
