import { useState } from 'react';
import searchBarImage from '../assets/search-bar.jpg'; 
import btnPatientImage from '../assets/btn-patient.jpg';
import patientNameImage from '../assets/patient-name.jpg';
import editDeleteImage from '../assets/edit-delete.jpg';
import btnRecordImage from '../assets/btn-record.jpg';
import chartImage from '../assets/chart.jpg';
import api from '../api/axios';
import PropTypes from 'prop-types';

const HelpCenter = ({ setNotification }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setNotification({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      await api.post('/report/', { title, description });

      setNotification({
        message: 'Report created successfully. Thank you and apologies for any inconvenience caused.',
        type: 'success',
      });

      setTitle('');
      setDescription('');
    } catch {
      setNotification({ message: 'Failed to submit report. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-w-[320px] sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl min-h-screen flex-1">
      <div className="w-full px-2 py-2 overflow-auto sm:no-scrollbar h-screen sm:px-6 md:px-10 lg:py-4 2xl:px-12 2xl:py-5">
        <h2 className="font-semibold mt-7 text-xl md:text-2xl lg:text-3xl xl:text-4xl">Help Center</h2>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">1. Search Patient</h3>
          <div className="pt-2">
            <img src={searchBarImage} alt="search bar" className="w-40" />
          </div>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Untuk pencarian nama pasien bisa berdasarkan register number, name, dan mobile number.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">2. Add Patient</h3>
          <div className="pt-2">
            <img src={btnPatientImage} alt="btn patient" className="w-28" />
          </div>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Klik tombol “Add Patient” untuk menambahkan data pasien baru dengan mengisi beberapa kolom input untuk
            melengkapi data pasien, seperti name, age, address, mobile number, dan gender.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">3. Patient Information</h3>
          <div className="pt-2">
            <img src={patientNameImage} alt="patient name" className="w-28" />
          </div>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Arahkan kursor mouse lalu klik nama pasien pada table untuk melihat detail informasi suatu pasien.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">4. Edit and Delete</h3>
          <div className="pt-2">
            <img src={editDeleteImage} alt="edit delete icon" className="w-28" />
          </div>
          <ul className="list-disc list-inside text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <li>Icon biru untuk memodifikasi suatu data pasien</li>
            <li>Icon merah untuk menghapus suatu data pasien</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">5. Add Record</h3>
          <div className="pt-2">
            <img src={btnRecordImage} alt="btn record" className="w-28" />
          </div>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Klik tombol “Add Record” untuk menambahkan data rekam medis suatu pasien.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">6. Doughnut Chart</h3>
          <div className="pt-2">
            <img src={chartImage} alt="doughnut chart" className="w-28" />
          </div>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Fungsi chart ini digunakan untuk melihat perbandingan berapa banyak pasien laki-laki dan perempuan, caranya
            dengan mengarahkan kursor mouse ke chart tersebut.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl">7. GIS Maps</h3>
          <p className="text-xs pl-3 pt-3 text-justify sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Fitur ini untuk melihat lokasi-lokasi klinik yang sudah terdaftar, dapat dilihat pada awal website.
          </p>
        </div>

        <h2 className="font-semibold mt-7 mb-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl">Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the problem"
              className="w-full p-3 lg:p-4 border rounded-xl shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="desc"
              className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
            >
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none"
            />
          </div>
          <div className="flex gap-x-2 lg:gap-x-4 mb-5">
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

HelpCenter.propTypes = {
  setNotification : PropTypes.func
};
export default HelpCenter;

