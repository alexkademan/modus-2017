
import classNames from 'classnames';
import React from 'react';
// import PropTypes from 'prop-types';

type Props = {
  href: ?string,
  className: ?string,
};

function Button(props: Props) {
  const cssclasses = classNames('button', props.className);
  return props.href
    ? <a {...props} className={cssclasses}>anchor tag</a>
    : <button {...props} className={cssclasses} />;
}

export default Button;
