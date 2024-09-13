import PropTypes from 'prop-types';
import FeatherIcon from './FeatherIcon';
import logo from '../assets/medgis-56x56.jpg';

const Navbar = ({ onLogout, onToggleSidebar, title }) => (
  <nav className="flex min-w-[320px] h-20 lg:h-24 2xl:h-28">
    <div className="w-48 border-r border-gray-400 hidden lg:flex lg:flex-col lg:justify-center lg:items-center xl:w-64">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="mb-2">
          <img
            src={logo}
            alt="Logo MedGIS"
            className="2xl:w-14 2xl:h-14 rounded-full"
          />
        </div>
        <p className="text-[10px] font-semibold 2xl:font-bold text-gray-400">
          Medical Geographic Information System
        </p>
      </div>
    </div>

    <div
      id="toggleButton"
      className="w-16 flex shrink-0 justify-center items-center cursor-pointer border-b border-gray-400 sm:w-24 lg:hidden"
      onClick={onToggleSidebar}
    >
      <div className="rounded-md p-1 flex justify-center items-center">
        <FeatherIcon icon="menu" />
      </div>
    </div>

    <div className="flex grow justify-between items-center border-b border-gray-400">
      <h1 className="ml-5 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {title} 
      </h1>
      <div className="flex justify-center justify-items-center items-center mr-5 text-xs font-medium sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
        <button
          onClick={onLogout}
          className="flex justify-center items-center gap-x-2 xl:gap-x-4"
        >
          <FeatherIcon
            icon="log-out"
            className="w-6 h-6"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Navbar;
