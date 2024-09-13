import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const DashboardMedrec = ({ record, onBack, onSubmit }) => {
  const [anamnesa, setAnamnesa] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    if (record) {
      setAnamnesa(record.anamnesa_and_examination);
      setDiagnosis(record.therapy_and_diagnosis);
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recordData = {
      anamnesa_and_examination: anamnesa,
      therapy_and_diagnosis: diagnosis,
    };

    onSubmit(recordData);
  };

  return (
    <div className="min-w-[320px] sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl 2xl:min-w-2xl min-h-screen flex-1">
      <div className="w-full px-2 py-2 overflow-auto sm:no-scrollbar h-screen sm:px-6 md:px-10 lg:py-4 2xl:px-20 2xl:py-5">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="sm:flex sm:gap-4 mb-8">
            <div className="flex-1 mb-2 sm:mb-0">
              <label
                htmlFor="anamnesa"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Anamnesa & Examination
              </label>
              <textarea
                name="anamnesa"
                id="anamnesa"
                cols="30"
                rows="10"
                required
                autoFocus
                value={anamnesa}
                onChange={(e) => setAnamnesa(e.target.value)}
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              ></textarea>
            </div>
            <div className="flex-1">
              <label
                htmlFor="diagnosis"
                className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
              >
                Therapy & Diagnosis
              </label>
              <textarea
                name="diagnosis"
                id="diagnosis"
                cols="30"
                rows="10"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:invalid:border-red-500 focus:valid:border-green-500"
              ></textarea>
            </div>
          </div>

          <div className="mb-4 sm:flex gap-x-4">
            {record && (
              <div className="flex-1 mb-6">
                <label
                  htmlFor="tglmedic"
                  className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                >
                  Date
                </label>
                <input
                  type="text"
                  name="tglmedic"
                  id="tglmedic"
                  value={new Date(record.date).toLocaleDateString()}
                  readOnly
                  className="w-full p-2 lg:p-4 border rounded-xl shadow-md bg-gray-100"
                />
              </div>
            )}

            <div className="flex-1 flex justify-start sm:justify-center sm:items-center">
              <div className="flex gap-x-4 justify-center items-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-[#A92327] text-white px-6 py-3 rounded-xl shadow-lg font-semibold active:translate-y-0.5 hover:bg-[#942c2f] lg:px-10 lg:py-4 lg:text-lg xl:text-xl"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold active:translate-y-0.5 hover:bg-indigo-900 lg:px-10 lg:py-4 lg:text-lg xl:text-xl"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

DashboardMedrec.propTypes = {
  record: PropTypes.shape({
    anamnesa_and_examination: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.string.isRequired,
    therapy_and_diagnosis: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DashboardMedrec;