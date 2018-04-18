import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ className, style }) => (
  <h1 className={className} style={style} >
    Not Found
  </h1>
);

NotFound.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default NotFound;
