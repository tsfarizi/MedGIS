import { useEffect, useState } from 'react';
import api from '../api/axios';
import logo from '../assets/medgis-56x56.jpg';

const Home = () => {
    const [mapHtml, setMapHtml] = useState('');

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await api.get('/medgis_gis_map/');
                setMapHtml(response.data.map_html);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchMapData();
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-4 sm:mb-0">
                    <img
                        src={logo}
                        alt="Logo MedGIS"
                        className="w-14 h-14 rounded-full"
                    />
                    <h1 className="text-2xl font-bold p-3">MedGIS Map</h1>
                </div>
                
                <a
                    href="#dashboard"
                    className="text-sm sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-5 py-2 sm:py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
                >
                    Join as a Partner
                </a>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: mapHtml }}
                className="h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-xl shadow-lg border border-gray-300 overflow-hidden"
            />
        </div>
    );
};

export default Home;
