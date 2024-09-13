import PropTypes from 'prop-types';
import TableRow from './TableRow';  // Import the TableRow component

const DataTable = ({ rows, onEditPatient, onViewPatientDetails, onDeletePatient, onExportPatient }) => (
  <div className="overflow-hidden rounded-lg p-2 shadow-lg mt-2" style={{ height: 'calc(100vh - 200px)' }}>
    <div className="overflow-auto h-full relative sm:no-scrollbar">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left text-gray-700">
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              No
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Birth Date
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Name
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Phone
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Registered
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Last Visit
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Action
            </th>
            <th className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white">
              Export
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {rows.map((row, index) => (
            <TableRow
              key={row.registration_number || `temp-${index}`}  // Use registration_number or a fallback key
              number={index + 1}
              birthDate={row.birth_date}
              fullName={row.full_name}
              phone={row.phone}
              medicalRecords={row.medical_records}
              onViewDetails={() => onViewPatientDetails(row)}
              onEdit={() => onEditPatient(row)}
              onDelete={() => onDeletePatient(row.registration_number)}
              onExport={() => onExportPatient(row.registration_number)}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// DataTable PropTypes
DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      birth_date: PropTypes.string,
      full_name: PropTypes.string,
      phone: PropTypes.string,
      age: PropTypes.number,
      gender: PropTypes.string,
      address: PropTypes.string,
      medical_records: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          diagnosis: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          patient: PropTypes.string,
          therapy: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onEditPatient: PropTypes.func.isRequired,
  onViewPatientDetails: PropTypes.func.isRequired,
  onDeletePatient: PropTypes.func.isRequired,
  onExportPatient: PropTypes.func.isRequired,
};

export default DataTable;
