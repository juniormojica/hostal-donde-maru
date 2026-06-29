
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Button({ variant='solid', className, children, handleClick, ...props }) {
  const baseStyle = 'px-4 py-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta';
  const variantStyles = {
    outline: 'border border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white',
    solid: 'bg-caribbeanGreen text-white hover:bg-terracotta font-bold',
  };

  const buttonClass = classNames(baseStyle, variantStyles[variant], className);

  return (
    <button  onClick={handleClick}className={buttonClass} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['outline', 'solid']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

