// Dashboard.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../components/DashboardHome';
import DashboardPatient from '../components/DashboardPatient';
import DetailPatient from '../components/DetailPatient';
import DashboardMedrec from '../components/DashboardMedrec';
import HelpCenter from './HelpCenter';
import Auth from './Auth';
import Notification from '../components/Notification';

import useAuth from '../hooks/useAuth';
import usePatients from '../hooks/usePatients';
import useMedicalRecords from '../hooks/useMedicalRecords';
import useSidebar from '../hooks/useSidebar';
import useNotification from '../hooks/useNotification';
import useExport from '../hooks/useExport';

const Dashboard = () => {
  // Use custom hooks
  const { isAuthenticated, authenticateUser, handleLogout } = useAuth();
  const { notification, setNotification, closeNotification } = useNotification();
  const { sidebarOpen, activePage, toggleSidebar, handlePageChange } = useSidebar();

  const {
    patients,
    selectedPatient,
    setSelectedPatient,
    fetchPatients,
    handleAddPatient,
    handleUpdatePatient,
    handleDeletePatient,
  } = usePatients(isAuthenticated, setNotification);

  const {
    selectedRecord,
    setSelectedRecord,
    fetchMedicalRecords,
    handleSubmitRecord,
    handleDeleteRecord,
  } = useMedicalRecords(selectedPatient, setNotification);

  const { handleExport } = useExport(setNotification);

  const [view, setView] = useState('home');

  const handleViewPatientDetails = async (patient) => {
    setSelectedPatient(patient);
    const medicalRecords = await fetchMedicalRecords(patient.registration_number);
    setSelectedPatient((prevPatient) => ({
      ...prevPatient,
      medical_records: medicalRecords,
    }));
    setView('detail');
  };

  // Authentication check
  if (!isAuthenticated) {
    return <Auth onAuthenticate={authenticateUser} />;
  }

  return (
    <div>
      <Navbar
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        title={activePage === 'dashboard' ? 'Dashboard' : 'Help Center & Report'}
      />
      <div className="flex w-full">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
        {activePage === 'dashboard' && view === 'home' && (
          <DashboardHome
            totalPatients={patients.length}
            totalMale={patients.filter((p) => p.gender === 'Male').length}
            totalFemale={patients.filter((p) => p.gender === 'Female').length}
            patientRows={patients}
            onAddPatient={() => setView('add')}
            onEditPatient={(patient) => {
              setSelectedPatient(patient);
              setView('editPatient');
            }}
            onViewPatientDetails={handleViewPatientDetails}
            onDeletePatient={handleDeletePatient}
            onExportPatient={(registrationNumber) =>
              handleExport(registrationNumber, selectedPatient?.full_name)
            }
          />
        )}
        {activePage === 'helpCenter' && <HelpCenter setNotification={setNotification} />}
        {view === 'add' && (
          <DashboardPatient
            onBack={() => setView('home')}
            onAddPatient={(patient) => {
              handleAddPatient(patient);
              setView('home');
            }}
            setNotification={setNotification}
          />
        )}
        {view === 'editPatient' && selectedPatient && (
          <DashboardPatient
            onBack={() => setView('home')}
            patient={selectedPatient}
            onUpdatePatient={(updatedFields) => {
              handleUpdatePatient(updatedFields);
              setView('home');
            }}
            setNotification={setNotification}
          />
        )}
        {view === 'detail' && selectedPatient && (
          <DetailPatient
            patient={selectedPatient}
            onBack={() => {
              setView('home');
              fetchPatients();
            }}
            onAddRecord={() => {
              setSelectedRecord(null);
              setView('addRecord');
            }}
            onEditRecord={(record) => {
              setSelectedRecord(record);
              setView('editRecord');
            }}
            onDeleteRecord={async (recordId) => {
              const updatedRecords = await handleDeleteRecord(recordId);
              setSelectedPatient((prevPatient) => ({
                ...prevPatient,
                medical_records: updatedRecords,
              }));
            }}
          />
        )}
        {view === 'addRecord' && (
          <DashboardMedrec
            onBack={() => setView('detail')}
            onSubmit={async (recordData) => {
              const updatedRecords = await handleSubmitRecord(recordData);
              setSelectedPatient((prevPatient) => ({
                ...prevPatient,
                medical_records: updatedRecords,
              }));
              setView('detail');
            }}
          />
        )}
        {view === 'editRecord' && selectedRecord && (
          <DashboardMedrec
            record={selectedRecord}
            onBack={() => setView('detail')}
            onSubmit={async (recordData) => {
              const updatedRecords = await handleSubmitRecord(recordData, true);
              setSelectedPatient((prevPatient) => ({
                ...prevPatient,
                medical_records: updatedRecords,
              }));
              setView('detail');
            }}
          />
        )}
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Dashboard;
