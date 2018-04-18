import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form as ReduxForm } from 'redux-form';

<%_ if (baseStyles) { _%>
import styles from './form.css';
<%_ } _%>

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
  }

  render() {
    const { children, className, error, warning, handleSubmit, style } = this.props;

    return (
      <ReduxForm 
        onSubmit={handleSubmit} 
      <%_ if (baseStyles) { _%>
        className={classNames(styles.main, className)} 
      <%_ } else { _%>
        className={className} 
      <%_ } _%>
        style={style}>
        {children}
        {error && 
          <div 
            name='form-error' 
      <%_ if (baseStyles) { _%>
            className={styles.error}>
      <%_ } else { _%>
            className='form-error'>
      <%_ } _%>
            <strong>{error}</strong>
          </div>}
        {warning && 
          <div 
            name='form-warning' 
      <%_ if (baseStyles) { _%>
            className={styles.warning}>
      <%_ } else { _%>
            className='form-warning'>
      <%_ } _%>
            <strong>{warning}</strong>
          </div>}
      </ReduxForm>
    );
  }
}
