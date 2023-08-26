import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/themes/theme-c137';

export const BeautifulButton = ({
  className = '',
  onClick,
  message = '',
  disabled = false,
  buttonType = 'primary',
}) => {
  return (
    <AwesomeButton
      style={{ zIndex: '0' }}
      ripple={true}
      cssModule={AwesomeButtonStyles}
      type={buttonType}
      disabled={disabled}
      onPress={onClick}
    >
      {message}
    </AwesomeButton>
  );
};
