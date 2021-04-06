import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export const BngClickOutsideOverlay = ({
  className = '',
  onClick = _.noop,
  container = document.body,
  ...props
}) => {
  return ReactDOM.createPortal(
    <div
      className={`BngClickOutsideOverlay ${className}`}
      onClick={onClick}
      {...props}
    />,
    container
  );
};
