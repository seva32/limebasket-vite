/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonContent = ({ children, icon }) => (
  // eslint-disable-next-line max-len
  <span
    style={{
      paddingRight: 10,
      fontWeight: 600,
      color: 'black',
      paddingLeft: icon ? 0 : 10,
      paddingTop: 5,
      paddingBottom: 5,
    }}
  >
    {children}
  </span>
);

ButtonContent.propTypes = {
  icon: PropTypes.any.isRequired,
  children: PropTypes.node,
};

ButtonContent.defaultProps = {
  children: null,
};

export default ButtonContent;
