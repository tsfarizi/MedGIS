import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => (
  <div className="flex gap-x-2">
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-400">
        <i data-feather="search" className="w-4 h-4 sm:w-6 sm:h-6"></i>
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="pl-8 pr-2 py-2 w-24 text-[10px] sm:text-base sm:w-56 sm:pl-11 sm:pr-3 md:w-60 lg:w-64 border-2 text-gray-600 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;