import PropTypes from 'prop-types';
import deleteIcon from '../assets/Delete.svg';
import editIcon from '../assets/Edit.svg';
import FeatherIcon from './FeatherIcon';

// Function to format date to DD/MM/YYYY
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1; // getMonth() returns month from 0-11
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to get registered and last visit dates
const getRecordDates = (medicalRecords) => {
  if (!medicalRecords || medicalRecords.length === 0) return { registered: '', lastVisit: '' };

  const dates = medicalRecords.map((record) => new Date(record.date));
  const registered = formatDate(new Date(Math.min(...dates)));
  const lastVisit = formatDate(new Date(Math.max(...dates)));

  return { registered, lastVisit };
};

// TableRow Component
const TableRow = ({
  number,
  birthDate = '',
  fullName = '',
  phone = '',
  medicalRecords = [],
  onViewDetails,
  onEdit,
  onDelete,
  onExport,
}) => {
  const { registered, lastVisit } = getRecordDates(medicalRecords);

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2 xl:py-4 2xl:py-6">{number}.</td>
      <td className="p-2 xl:py-4 2xl:py-6">{formatDate(birthDate)}</td>
      <td className="p-2 xl:py-4 2xl:py-6">
        <button type="button" onClick={onViewDetails}>
          {fullName}
        </button>
      </td>
      <td className="p-2 xl:py-4 2xl:py-6">{phone}</td>
      <td className="p-2 xl:py-4 2xl:py-6">{registered}</td>
      <td className="p-2 xl:py-4 2xl:py-6">{lastVisit}</td>
      <td className="p-2 xl:py-4 2xl:py-6">
        <div className="flex gap-x-1">
          <button onClick={onEdit}>
            <img src={editIcon} alt="Edit Icon" />
          </button>
          <button onClick={onDelete}>
            <img src={deleteIcon} alt="Delete Icon" />
          </button>
        </div>
      </td>
      <td className="p-2 xl:py-4 2xl:py-6">
        <button onClick={onExport} className="flex">
          <FeatherIcon icon="share" className="justify-items-center ml-3" />
        </button>
      </td>
    </tr>
  );
};

// TableRow PropTypes
TableRow.propTypes = {
  number: PropTypes.number.isRequired,
  birthDate: PropTypes.string,
  fullName: PropTypes.string,
  phone: PropTypes.string,
  medicalRecords: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      patient: PropTypes.string,
    })
  ),
  onViewDetails: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default TableRow;
