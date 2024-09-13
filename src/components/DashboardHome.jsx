import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DashboardCards from './DashboardCards';
import SearchBar from './SearchBar';
import AddPatientButton from './AddPatientButton';
import DataTable from './DataTable';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1; 
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const DashboardHome = ({
  totalPatients,
  totalMale,
  totalFemale,
  patientRows,
  onAddPatient,
  onEditPatient,
  onViewPatientDetails,
  onDeletePatient,
  onExportPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const filteredRows = patientRows.filter((row) => {
    const fullName = row.full_name || '';
    const phone = row.phone || '';
    const registrationNumber = row.registration_number || '';
    const birthDate = formatDate(row.birth_date); 
    
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery) ||
      registrationNumber.includes(searchQuery) ||
      birthDate.includes(searchQuery) 
    );
  });

  const currentDate = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${dayNames[currentDate.getDay()]}, ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [totalMale, totalFemale],
        backgroundColor: ['#4a90e2', '#f0c419'],
        hoverBackgroundColor: ['#357ab7', '#e8b023'],
      },
    ],
  };

  return (
    <div className="min-w-[320px] sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl min-h-screen lg:flex-1">
      <div className="w-full px-2 py-2 overflow-auto sm:no-scrollbar h-screen sm:px-6 md:px-10 lg:py-4 2xl:px-20 2xl:py-5">
        <h2 className="font-semibold text-lg mt-8 sm:text-xl md:text-2xl lg:text-3xl text-shadow-md">
          Have a Nice Day, Admin!
        </h2>
        <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm lg:text-lg">
          <span>{formattedDate}</span>
        </div>
        <DashboardCards totalPatients={totalPatients} chartData={chartData} />
        <div className="flex items-center justify-between space-x-2 mt-9">
          <SearchBar onSearch={handleSearch} />
          <AddPatientButton onClick={onAddPatient} />
        </div>
        <DataTable
          rows={filteredRows}
          onEditPatient={onEditPatient}
          onViewPatientDetails={onViewPatientDetails}
          onDeletePatient={onDeletePatient}
          onExportPatient={onExportPatient}
        />
      </div>
    </div>
  );
};

DashboardHome.propTypes = {
  totalPatients: PropTypes.number.isRequired,
  totalMale: PropTypes.number.isRequired,
  totalFemale: PropTypes.number.isRequired,
  patientRows: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      birth_date: PropTypes.string, 
      clinic: PropTypes.string,
      full_name: PropTypes.string,
      gender: PropTypes.string,
      medical_records: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          patient: PropTypes.string,
        })
      ),
      phone: PropTypes.string,
      registration_number: PropTypes.string,
    })
  ).isRequired,
  onAddPatient: PropTypes.func.isRequired,
  onEditPatient: PropTypes.func.isRequired,
  onViewPatientDetails: PropTypes.func.isRequired,
  onDeletePatient: PropTypes.func.isRequired,
  onExportPatient: PropTypes.func.isRequired,
};

export default DashboardHome;
