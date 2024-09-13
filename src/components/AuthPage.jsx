import PropTypes from 'prop-types';
import Auth from './Auth';

const AuthPage = ({ onAuthenticate }) => <Auth onAuthenticate={onAuthenticate} />;

AuthPage.propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
};

export default AuthPage;