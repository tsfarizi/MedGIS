import PropTypes from 'prop-types';
import ChartComponent from './ChartComponent';

const DashboardCards = ({ totalPatients, chartData }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
    {/* Total Patients Card */}
    <div className="h-24 bg-indigo-700 rounded-xl shadow-xl text-white font-semibold sm:h-28 md:h-32 lg:h-36 xl:h-40 flex flex-col justify-center">
      <p className="text-[10px] ml-2 sm:text-sm sm:ml-4 md:text-md lg:text-lg xl:text-xl">
        Total Patients
      </p>
      <div className="text-center mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        {isNaN(totalPatients) ? 0 : totalPatients}
      </div>
    </div>

    {/* Chart Card */}
    <div className="h-24 bg-indigo-700 rounded-xl shadow-xl relative flex items-center justify-center sm:h-28 md:h-32 lg:h-36 xl:h-40">
      <ChartComponent data={chartData} />
    </div>
  </div>
);

DashboardCards.propTypes = {
  totalPatients: PropTypes.number.isRequired,
  chartData: PropTypes.object.isRequired,
};

export default DashboardCards;
