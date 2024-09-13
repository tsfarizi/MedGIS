import PropTypes from 'prop-types';
import HelpCenter from './HelpCenter';

const HelpCenterPage = ({ setNotification }) => <HelpCenter setNotification={setNotification} />;

HelpCenterPage.propTypes = {
  setNotification: PropTypes.func.isRequired,
};

export default HelpCenterPage;