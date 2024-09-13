import { useState, useEffect } from 'react';
import api from '../api/axios';

const usePatients = (isAuthenticated, setNotification) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/medrec/patients/');
      const transformedPatients = response.data.patients.map((patient) => ({
        ...patient,
        age: Number(patient.age),
      }));
      setPatients(transformedPatients);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPatients();
    }
  }, [isAuthenticated]);

  const handleAddPatient = (patient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
    fetchPatients();
    setNotification({ message: 'Patient added successfully.', type: 'success' });
  };

  const handleUpdatePatient = (updatedFields) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) =>
        p.registration_number === selectedPatient.registration_number ? { ...p, ...updatedFields } : p
      )
    );
    setNotification({ message: 'Patient updated successfully.', type: 'success' });
  };

  const handleDeletePatient = async (registrationNumber) => {
    try {
      await api.delete(`/medrec/patients/${registrationNumber}/`);
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.registration_number !== registrationNumber)
      );
      fetchPatients();
      setNotification({ message: 'Patient deleted successfully.', type: 'success' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      setNotification({ message: 'Error deleting patient. Please try again.', type: 'error' });
    }
  };

  return {
    patients,
    selectedPatient,
    setSelectedPatient,
    fetchPatients,
    handleAddPatient,
    handleUpdatePatient,
    handleDeletePatient,
  };
};

export default usePatients;
