import { useState } from 'react';
import api from '../api/axios';

const useMedicalRecords = (selectedPatient, setNotification) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchMedicalRecords = async (registrationNumber) => {
    try {
      const response = await api.get(`/medrec/medicalrecords/by-patient/${registrationNumber}/`);
      return response.data.medical_records;
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  const handleSubmitRecord = async (recordData, isEdit = false) => {
    try {
      if (isEdit && selectedRecord) {
        await api.patch(`/medrec/medicalrecords/${selectedRecord.id}/`, recordData);
        setNotification({ message: 'Record updated successfully.', type: 'success' });
      } else {
        const payload = {
          patient_registration_number: selectedPatient.registration_number,
          therapy_and_diagnosis: recordData.therapy_and_diagnosis,
          anamnesa_and_examination: recordData.anamnesa_and_examination,
        };
        await api.post('/medrec/medicalrecords/', payload);
        setNotification({ message: 'Record added successfully.', type: 'success' });
      }
      const updatedRecords = await fetchMedicalRecords(selectedPatient.registration_number);
      return updatedRecords;
    } catch (error) {
      console.error('Error adding/updating medical record:', error);
      setNotification({ message: 'Error updating record. Please try again.', type: 'error' });
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await api.delete(`/medrec/medicalrecords/${recordId}/`);
      const updatedRecords = await fetchMedicalRecords(selectedPatient.registration_number);
      setNotification({ message: 'Record deleted successfully.', type: 'success' });
      return updatedRecords;
    } catch (error) {
      console.error('Error deleting medical record:', error);
      setNotification({ message: 'Error deleting record. Please try again.', type: 'error' });
    }
  };

  return {
    selectedRecord,
    setSelectedRecord,
    fetchMedicalRecords,
    handleSubmitRecord,
    handleDeleteRecord,
  };
};

export default useMedicalRecords;
