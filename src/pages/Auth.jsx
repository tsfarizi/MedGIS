import { useState } from 'react';
import PropTypes from 'prop-types';
import api, { calculateExpirationTime } from '../api/axios';
import Cookies from 'js-cookie';
import Logo from '../assets/logo.webp';
import { useGeolocated } from 'react-geolocated';

const Auth = ({ onAuthenticate }) => {
  const [isRegistering, setIsRegistering] = useState(false); 
  const [location, setLocation] = useState({ latitude: null, longitude: null }); 
  const [useCurrentLocation, setUseCurrentLocation] = useState(false); 

  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    onError: () => console.error('Error retrieving location'),
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clinic_name: '',
    phone_number: '',
    penanggungjawab: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation) {
      getPosition();
      if (coords) {
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      }
    } else {
      setLocation({ latitude: null, longitude: null });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isRegistering ? '/auth/register/' : '/auth/login/';
      const requestData = isRegistering
        ? {
            clinic_name: formData.clinic_name,
            phone_number: formData.phone_number,
            penanggungjawab: formData.penanggungjawab,
            email: formData.email,
            password: formData.password,
            latitude: useCurrentLocation ? location.latitude : null,
            longitude: useCurrentLocation ? location.longitude : null,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await api.post(url, requestData);
      const { access, refresh } = response.data;
      const accessTokenExpiry = calculateExpirationTime(15);

      Cookies.set('accessToken', access, { expires: 1 / 96 });
      Cookies.set('refreshToken', refresh, { expires: 1 });
      localStorage.setItem('accessTokenExpiry', accessTokenExpiry);

      onAuthenticate();
    } catch (error) {
      console.error('Authentication error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen sm:flex-row">
      <div className="flex flex-col sm:flex-row w-full min-h-screen">
        <div className="w-full flex-1 flex items-center justify-center bg-indigo-700 p-8 sm:bg-white md:p-10 min-h-screen sm:min-h-0 2xl:p-16 sm:min-w-sm md:min-w-md lg:min-w-lg group">
          <div className="w-full h-full border shadow-[0px_6px_20px_0px_rgb(255_255_255_/_0.7)] overflow-hidden flex items-center justify-center rounded-xl sm:bg-indigo-700 sm:border-none sm:shadow-none">
            <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
              <img
                src={Logo}
                alt="Logo klinik"
                className="rounded-full shadow-[0px_6px_20px_0px_rgb(255_255_255_/_0.7)] sm:mt-10 sm:group-hover:scale-105"
              />
              <p className="mt-12 sm:mt-20 font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#C2FDFF] via-[#C2FDFF] to-[#6FC3F7] md:text-4xl pb-1 lg:mb-10 xl:text-5xl">
                Terhubung dengan 300+ Klinik yang Telah Bergabung
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 bg-white p-8 flex flex-col justify-center sm:min-w-sm md:min-w-md md:p-10 lg:min-w-lg lg:p-14 min-h-screen sm:min-h-0 overflow-y-auto">
          <h1 className="text-2xl font-bold text-center mb-6 md:text-3xl lg:text-4xl xl:text-5xl">
            {isRegistering ? 'REGISTER' : 'LOGIN'}
          </h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            {isRegistering ? (
              <>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label
                      htmlFor="clinic_name"
                      className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                    >
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      name="clinic_name"
                      id="clinic_name"
                      placeholder="Clinic name"
                      required
                      value={formData.clinic_name}
                      onChange={handleChange}
                      className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Phone number"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                    />
                  </div>
                </div>
                <label
                  htmlFor="penanggungjawab"
                  className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                >
                  Name Of Person In Charge
                </label>
                <input
                  type="text"
                  name="penanggungjawab"
                  id="penanggungjawab"
                  placeholder="Name Of Person In Charge"
                  required
                  value={formData.penanggungjawab}
                  onChange={handleChange}
                  className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500 mb-4"
                />
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="locationCheckbox"
                    className="form-checkbox rounded-full text-indigo-600 focus:ring-indigo-500 transition duration-300"
                    checked={useCurrentLocation}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="locationCheckbox" className="ml-3 text-sm lg:text-base xl:text-lg">
                    Register current location as clinic location
                  </label>
                </div>

                {useCurrentLocation && location.latitude && location.longitude && (
                  <div className="mb-6">
                    <div className="flex justify-start">
                      <div className="text-left text-sm text-gray-600">
                        <p>Latitude: {location.latitude}</p>
                        <p>Longitude: {location.longitude}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 md:text-base lg:text-lg xl:text-xl"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 lg:p-4 border rounded-xl shadow-md focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-500"
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white p-3 rounded-xl shadow-lg font-bold active:translate-y-0.5 hover:bg-indigo-900 md:p-4 lg:text-lg xl:text-xl"
            >
              {isRegistering ? 'REGISTER' : 'LOGIN'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-2 sm:text-sm md:text-md lg:text-lg">
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}
            <button
              type="button"
              className="text-blue-600 hover:underline hover:text-blue-800 ml-2"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
          <a
            href="/MedGIS/"
            className="flex items-center justify-center mt-4 w-60 text-sm sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-5 py-2 sm:py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

Auth.propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
};

export default Auth;
