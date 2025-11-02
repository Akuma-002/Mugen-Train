import React, { useContext, useState } from 'react';
import { TrainListContext } from './context/TrainList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SearchInfoContext } from './context/SearchInfo.jsx';
import { Button } from './ui/Button.jsx';

const Trains = () => {
  const { trains } = useContext(TrainListContext);
  const { searchInfo } = useContext(SearchInfoContext);
  const [routeVisible, setRouteVisible] = useState(true);

  if (!trains || trains.length === 0) {
    return (
      <div className="noTrains text-center text-gray-600 mt-24 text-xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-12 rounded-3xl shadow-xl font-semibold tracking-wide">
        🚆 No trains available 😔
      </div>
    );
  }

  const date = new Date(searchInfo.date);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });

  const toggleRoute = (index) => {
    setRouteVisible(routeVisible === index ? null : index);
  };

  return (
    <div className="trainsList max-w-5xl mx-auto p-8 bg-transparent from-indigo-50 via-white to-indigo-50">
      <div className="h-20"></div>
      <h2 className="trainsHeading text-5xl font-extrabold text-indigo-700 mb-12 text-center tracking-tight drop-shadow-lg font-serif">
        Available Trains
      </h2>

      {/* Search Box */}
      <div className="searchBox border-4 border-indigo-200 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-10 mb-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-10 shadow-lg backdrop-blur-md">
        <div className="flex w-full gap-10">
          <div className="source flex flex-col flex-1">
            <label className="block text-md font-semibold text-indigo-900 mb-2 uppercase tracking-wider">
              Source
            </label>
            <input
              type="text"
              className="w-full border-b-4 border-indigo-400 rounded-none p-4 bg-white bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition shadow-sm"
              placeholder="Source" value={searchInfo.source}
            />
          </div>
          <div className="flex items-center justify-center px-6">
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-indigo-800 text-3xl drop-shadow-md transform hover:scale-125 transition-transform duration-300" />
          </div>
          <div className="destination flex flex-col flex-1">
            <label className="block text-md font-semibold text-indigo-900 mb-2 uppercase tracking-wider">
              Destination
            </label>
            <input
              type="text"
              className="w-full border-b-4 border-indigo-400 rounded-none p-4 bg-white bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition shadow-sm"
              placeholder="Destination" value={searchInfo.destination}
            />
          </div>
        </div>
        <button className="mt-8 md:mt-0 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl hover:from-purple-700 hover:to-indigo-700 shadow-xl font-bold tracking-wider uppercase transition-transform transform hover:scale-105">
          Search
        </button>
      </div>

      {/* Train Cards */}
      {trains.map((train, index) => (
        <div
          key={index}
          className="trainCard bg-white bg-opacity-90 rounded-3xl p-8 mb-10 shadow-xl hover:shadow-3xl border-4 border-indigo-100 hover:border-indigo-400 transition duration-500"
        >
          <h3 className="trainName text-3xl font-extrabold text-indigo-900 mb-6 tracking-wide font-serif select-none">
            {train.train_name}{' '}
            <span className="font-extrabold text-indigo-400">#{train.train_number}</span>
          </h3>

          <div className="flex items-center justify-between mb-6 gap-12 select-none">
            {/* Departure */}
            <div>
              <p className="departureTime text-xl font-mono text-indigo-800 bg-indigo-100 px-5 py-2 rounded-full shadow-inner inline-block tracking-wide">
                {train.departure_time},
              </p>
              <p className="inline ml-3 text-gray-500 text-lg font-mono">
                {formattedDate}
              </p>
            </div>

            {/* Arrival */}
            <div>
              <p className="arrivalTime text-xl font-mono text-purple-800 bg-purple-100 px-5 py-2 rounded-full shadow-inner inline-block tracking-wide">
                {(() => {
                  const [depHours, depMinutes] = train.departure_time.split(':').map(Number);
                  const [totalHours, totalMinutes] = train.total_time.split(':').map(Number);
                  let totalDepartureMinutes = depHours * 60 + depMinutes;
                  let totalTravelMinutes = totalHours * 60 + totalMinutes;
                  let arrivalMinutes = totalDepartureMinutes + totalTravelMinutes;
                  arrivalMinutes %= 24 * 60;
                  const arrivalHours = String(Math.floor(arrivalMinutes / 60)).padStart(2, '0');
                  const arrivalMins = String(arrivalMinutes % 60).padStart(2, '0');
                  return `${arrivalHours}:${arrivalMins}`;
                })()}
              </p>
              <p className="inline ml-3 text-gray-500 text-lg font-mono">
                {(() => {
                  const [depYear, depMonth, depDay] = searchInfo.date.split('-').map(Number);
                  const [depHours, depMinutes] = train.departure_time.split(':').map(Number);
                  const [totalHours, totalMinutes] = train.total_time.split(':').map(Number);

                  const departure = new Date(depYear, depMonth - 1, depDay, depHours, depMinutes);
                  const totalDurationMs = (totalHours * 60 + totalMinutes) * 60 * 1000;
                  const arrival = new Date(departure.getTime() + totalDurationMs);

                  return arrival.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                })()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-12 my-6 select-none text-indigo-600 font-semibold tracking-wide text-lg">
            <p>{searchInfo.source}</p>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-indigo-400 text-2xl" />
            <p>{searchInfo.destination}</p>
          </div>

          <p className="text-indigo-700 text-xl font-semibold mb-6 tracking-widest select-none">
            {(() => {
              const totalTime = train.total_time.replace(':', 'h ') + 'm';
              return totalTime;
            })()}
          </p>

          <div className="flex gap-6 mb-8">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-3xl hover:from-purple-700 hover:to-indigo-700 shadow-lg font-extrabold tracking-wide transition-transform transform hover:scale-105">
              Book Now
            </Button>
            <Button
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-3xl hover:bg-gray-300 shadow-md font-semibold transition"
              onClick={() => setRouteVisible(!routeVisible)}
            >
              {!routeVisible? 'Hide Route' : 'View Route'}
            </Button>
          </div>

          <div
            className={`routes mt-6 transition-opacity duration-700 ease-in-out ${
              routeVisible ? 'hidden' : ''
            }`}
            style={{maxHeight: '40rem', 
                    overflowY: 'auto', 
                    overflowX: 'auto', 
                    borderRadius: '1rem',
                    boxShadow: '0 2px 8px rgba(99,102,241,0.12)'
                  }}
          >
            <table className="min-w-full table-auto overflow-scroll bg-white rounded-xl  shadow-lg select-text">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="px-6 py-3 text-left text-indigo-900 font-bold uppercase tracking-wide">Station</th>
                  <th className="px-6 py-3 text-left text-indigo-900 font-bold uppercase tracking-wide">Arrival Time</th>
                  <th className="px-6 py-3 text-left text-indigo-900 font-bold uppercase tracking-wide">Departure Time</th>
                  <th className="px-6 py-3 text-left text-indigo-900 font-bold uppercase tracking-wide">Halt Time (m)</th>
                  <th className="px-6 py-3 text-left text-indigo-900 font-bold uppercase tracking-wide">Distance from Source (km)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-200">
                {Object.values(train.train_route).map((station, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50 transition-colors duration-300">
                    <td className="px-6 py-4">{station.station_name}</td>
                    <td className="px-6 py-4">{station.arrival_time || 'N/A'}</td>
                    <td className="px-6 py-4">{station.departure_time || 'N/A'}</td>
                    <td className="px-6 py-4">{station.halt_time_m || 'N/A'}</td>
                    <td className="px-6 py-4">{station.distance_from_source || 'N/A'} KM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trains;
