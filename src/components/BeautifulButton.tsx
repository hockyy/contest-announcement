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
      ripple={true}
      cssModule={AwesomeButtonStyles}
      type={buttonType}
      disabled={disabled}
      onPress={onClick}
    >
      {message}
    </AwesomeButton>
    // <button
    //   disabled={disabled}
    //   className={`rounded-lg bg-blue-200 px-3 py-1 text-black hover:bg-blue-300 ${className} disabled:bg-blue-50 disabled:text-gray-500`}
    //   onClick={onClick}
    // >
    //   {message}
    // </button>
  );
};
