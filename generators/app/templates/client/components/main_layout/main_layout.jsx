import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

<%_ if (baseStyles) { _%>
import PublicNavigation from 'components/public_navigation';
import styles from './main_layout.css';
<%_ } _%>

const MainLayout = ({ children, className, style }) => (
  <%_ if (baseStyles) { _%>
  <div className={classNames(styles.main, className)} style={style}>
  <%_ } else { _%>
  <div className={classNames('main-layout', className)} style={style}>
  <%_ } _%>
    <%_ if (baseStyles) { _%>
    <header>
      <PublicNavigation />
    </header>
    <%_ } _%>
    <main>
      {children}
    </main>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default MainLayout;
