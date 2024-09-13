import PropTypes from 'prop-types';
import feather from 'feather-icons';

const FeatherIcon = ({ icon, size = 24, color = 'currentColor', ...props }) => {
  const svg = feather.icons[icon].toSvg({ width: size, height: size, color });
  return <div dangerouslySetInnerHTML={{ __html: svg }} {...props} />;
};

FeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default FeatherIcon;