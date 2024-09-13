import PropTypes from 'prop-types';
import FeatherIcon from './FeatherIcon';

const Sidebar = ({ isOpen, onClose, activePage, onPageChange }) => (
  <div
    id="sidebar"
    className={`fixed inset-y-0 left-0 z-30 transition-transform transform bg-gray-100 border-r border-gray-400 lg:relative lg:translate-x-0 xl:bg-transparent ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } w-28 sm:w-36 md:w-48 lg:w-48 xl:w-64`} 
  >
    <div className="lg:hidden flex justify-end p-2">
      <button onClick={onClose}>
        <FeatherIcon icon="x" className="w-6 h-6" />
      </button>
    </div>
    <p className="text-gray-400 text-xs sm:text-sm md:text-base font-semibold hidden md:block md:mt-2 md:ml-2 xl:text-lg">
      Main Menu
    </p>
    <ul className="mt-4">
      <li className="py-2 sm:py-4">
        <button
          onClick={() => onPageChange('dashboard')}
          className={`flex items-center gap-x-2 ml-2 sm:ml-4 md:ml-6 ${
            activePage === 'dashboard' ? 'text-blue-600 font-bold' : 'text-gray-400'
          } ${activePage === 'helpCenter' ? 'hover:text-gray-600' : 'hover:text-blue-800'}`}
        >
          <FeatherIcon 
            icon="home" 
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${
              activePage === 'dashboard' ? 'text-blue-600' : 'text-gray-400'
            }`} 
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium">
            Dashboard
          </span>
        </button>
      </li>
    </ul>
    <p className="text-gray-400 text-xs sm:text-sm md:text-base font-semibold hidden md:block md:mt-4 md:ml-2 xl:text-lg">
      Help
    </p>
    <ul className="mt-4">
      <li className="py-2 sm:py-4">
        <button
          onClick={() => onPageChange('helpCenter')}
          className={`flex items-center gap-x-2 ml-2 sm:ml-4 md:ml-6 ${
            activePage === 'helpCenter' ? 'text-blue-600 font-bold' : 'text-gray-400'
          } ${activePage === 'dashboard' ? 'hover:text-gray-600' : 'hover:text-blue-800'}`}
        >
          <FeatherIcon 
            icon="help-circle" 
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${
              activePage === 'helpCenter' ? 'text-blue-600' : 'text-gray-400'
            }`} 
          />
          <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium">
            Help Center & Report
          </span>
        </button>
      </li>
    </ul>
  </div>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Sidebar;
