import PropTypes from 'prop-types';
import editIcon from '../assets/Edit.svg';
import deleteIcon from '../assets/Delete.svg';
import FeatherIcon from './FeatherIcon';

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const DetailPatient = ({ patient, onBack, onAddRecord, onEditRecord, onDeleteRecord }) => {
  const birthDateFormatted = new Date(patient.birth_date).toLocaleDateString();
  const age = calculateAge(patient.birth_date);

  return (
    <div className="min-w-[320px] sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl min-h-screen lg:flex-1">
      <div className="w-full px-2 py-2 overflow-auto sm:no-scrollbar h-screen sm:px-6 md:px-10 lg:py-4 2xl:px-20 2xl:py-5">
        <h2 className="font-bold text-center text-lg mt-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          PATIENT INFORMATION
        </h2>
        <hr className="mb-6 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16" />

        <p className="font-semibold mb-4 text-lg xl:text-2xl">PATIENT DATA</p>
        <div className="grid grid-cols-3 gap-y-4 gap-x-6 mb-6 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 md:gap-y-6 lg:gap-y-8 xl:gap-y-12 2xl:gap-y-16">
          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Name</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {patient.full_name}
            </p>
          </div>

          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Birth Date (Age)</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {birthDateFormatted} ({age})
            </p>
          </div>

          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Address</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {patient.address}
            </p>
          </div>

          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Mobile Number</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {patient.phone}
            </p>
          </div>

          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Gender</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {patient.gender}
            </p>
          </div>

          <div>
            <p className="text-[8px] sm:text-xs text-gray-400 mb-1">Registration Number</p>
            <p className="text-xs sm:text-sm lg:text-lg xl:text-xl font-medium">
              {patient.registration_number}
            </p>
          </div>
        </div>
        <hr className="mb-6 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16" />

        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-lg xl:text-2xl">MEDICAL RECORD</p>
          <button
            className="flex justify-center items-center gap-x-2 cursor-pointer bg-indigo-700 rounded-xl text-white px-2 py-1 shadow-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:py-3"
            onClick={onAddRecord}
          >
            <FeatherIcon icon="plus" size={16} />
            <span className="text-[10px] sm:text-base">Add Record</span>
          </button>
        </div>
        <div
          className="overflow-hidden rounded-lg p-2 shadow-lg mt-2"
          style={{ height: 'calc(100vh - 300px)' }}
        >
          <div className="overflow-auto h-full relative sm:no-scrollbar">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left text-gray-700">
                  <th
                    scope="col"
                    className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white"
                  >
                    Anamnesa & Examination
                  </th>
                  <th
                    scope="col"
                    className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white"
                  >
                    Therapy & Diagnosis
                  </th>
                  <th
                    scope="col"
                    className="w-auto px-2 py-1 xl:py-4 2xl:py-6 border-b border-gray-300 sticky top-0 bg-white"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {patient.medical_records.map((record, index) => (
                  <tr key={record.id} className="border-b border-gray-300">
                    <td className="p-2 xl:py-4 2xl:py-6">{index + 1}.</td>
                    <td className="p-2 xl:py-4 2xl:py-6">
                      {new Date(record.date).toLocaleDateString() || 'N/A'}
                    </td>
                    <td className="p-2 xl:py-4 2xl:py-6">
                      {record.anamnesa_and_examination || 'N/A'}
                    </td>
                    <td className="p-2 xl:py-4 2xl:py-6">
                      {record.therapy_and_diagnosis || 'N/A'}
                    </td>
                    <td className="p-2 xl:py-4 2xl:py-6">
                      <div className="flex gap-x-2">
                        <button onClick={() => onEditRecord(record)}>
                          <img src={editIcon} alt="Edit Icon" />
                        </button>
                        <button onClick={() => onDeleteRecord(record.id)}>
                          <img src={deleteIcon} alt="Delete Icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#A92327] text-white px-6 py-3 rounded-xl shadow-lg font-bold active:translate-y-0.5 hover:bg-[#942c2f] lg:px-10 lg:py-4 lg:text-lg xl:text-xl"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

DetailPatient.propTypes = {
  patient: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    birth_date: PropTypes.string.isRequired, 
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    registration_number: PropTypes.string.isRequired,
    medical_records: PropTypes.arrayOf(
      PropTypes.shape({
        anamnesa_and_examination: PropTypes.string,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        therapy_and_diagnosis: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onAddRecord: PropTypes.func.isRequired,
  onEditRecord: PropTypes.func.isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
};

export default DetailPatient;
