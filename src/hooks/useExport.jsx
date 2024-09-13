// hooks/useExport.js
import api from '../api/axios';

const useExport = (setNotification) => {
  const handleExport = async (registrationNumber, patientName) => {
    try {
      const response = await api.get(`/export/${registrationNumber}/`, {
        responseType: 'blob',
      });

      const sanitizedPatientName = patientName ? patientName.replace(/\s+/g, '_') : registrationNumber;
      const fileName = `${sanitizedPatientName}_export.pdf`;

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setNotification({ message: 'Error exporting PDF. Please try again.', type: 'error' });
    }
  };

  return { handleExport };
};

export default useExport;
