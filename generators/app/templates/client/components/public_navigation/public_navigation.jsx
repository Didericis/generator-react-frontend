import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './public_navigation.css';

const PublicNavigation = ({ className, style }) => (
  <div className={classNames(styles.main, className)} style={style}>
    <Link to='/'><img className={styles.logo} src='/img/logo.png'/></Link>
    <div className={styles.spacing} />
  </div>
);

PublicNavigation.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default PublicNavigation;
