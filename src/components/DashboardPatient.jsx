import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import api from '../api/axios'; 

const DashboardPatient = ({ onBack, patient, onUpdatePatient, onAddPatient, setNotification }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    birth_date: '', 
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        full_name: patient.full_name,
        gender: patient.gender,
        birth_date: patient.birth_date, 
        phone: patient.phone,
        address: patient.address,
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        full_name: formData.full_name,
        gender: formData.gender,
        birth_date: formData.birth_date,
        phone: formData.phone,
        address: formData.address,
      };
  
      if (patient && patient.registration_number) {
        await api.patch(`/medrec/patients/${patient.registration_number}/`, dataToSend);
        onUpdatePatient(dataToSend);
        setNotification({ message: 'Patient updated successfully.', type: 'success' });
      } else {
        const response = await api.post('/medrec/patients/', dataToSend);
        onAddPatient(response.data); 
        setNotification({ message: 'Patient added successfully.', type: 'success' });
      }
  
      onBack(); 
    } catch (error) {
      console.error('Error saving patient data:', error);
      const errorMessage = error.response?.data?.detail ||
        Object.entries(error.response?.data || {})
          .map(([key, value]) => `${key}: ${value[0]}`)
          .join(', ') ||
        'Error adding/updating patient. Please try again.';
      setNotification({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="min-w-[320px] sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl min-h-screen flex-1">
      <div className="w-full px-2 py-2 overflow-auto sm:no-scrollbar h-screen sm:px-6 md:px-10 lg:py-4 2xl:px-20 2xl:py-5">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4 flex gap-x-4">
            <div className="flex-1">
              <label
                htmlFor="full_name"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Name"
                value={formData.full_name}
                onChange={handleChange}
                autoFocus
                required
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              />
            </div>
            <div className="flex-1 mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block w-full border rounded-xl p-2 lg:p-4 shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              >
                <option value="" disabled>
                  -- select gender --
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mb-10">
            <div className="flex-1">
              <label
                htmlFor="birth_date"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Birth Date
              </label>
              <input
                type="date"
                name="birth_date"
                id="birth_date"
                placeholder="Birth Date"
                value={formData.birth_date}
                onChange={handleChange}
                required
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-10">
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              />
            </div>
          </div>

          <div className="flex gap-x-2 lg:gap-x-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-[#A92327] text-white px-6 py-3 rounded-xl shadow-lg font-bold active:translate-y-0.5 hover:bg-[#942c2f] lg:px-10 lg:py-4 lg:text-lg xl:text-xl"
            >
              BACK
            </button>
            <button
              type="submit"
              className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg font-bold active:translate-y-0.5 hover:bg-indigo-900 lg:px-10 lg:py-4 lg:text-lg xl:text-xl"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DashboardPatient.propTypes = {
  onBack: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    registration_number: PropTypes.string,
    full_name: PropTypes.string,
    phone: PropTypes.string,
    birth_date: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
  }),
  onUpdatePatient: PropTypes.func, 
  onAddPatient: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default DashboardPatient;
