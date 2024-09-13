import PropTypes from 'prop-types';
import FeatherIcon from './FeatherIcon';

const AddPatientButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex justify-center items-center gap-x-2 cursor-pointer bg-indigo-700 rounded-xl text-white px-2 py-1 shadow-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3"
  >
    <FeatherIcon icon="plus" size={16} />
    <span className="text-[10px] sm:text-base">Add Patient</span>
  </button>
);

AddPatientButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPatientButton;
