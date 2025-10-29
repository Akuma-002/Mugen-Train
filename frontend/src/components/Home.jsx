import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { TrainListContext } from './context/TrainList';
import { useNavigate } from 'react-router-dom';
import { DesignContext } from './context/DesignInfo';

const TRAIN_URL = import.meta.env.VITE_TRAIN_SERVER_API;
const Home = () => {
  const { trains, setTrains } = useContext(TrainListContext);
  const {setDesign} = useContext(DesignContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    trainClass: '',
    passengers: 1,
  });
  useEffect(() => {
  setDesign((prev) => ({ ...prev, navbarColor: "bg-transparent" , navTextColor: "text-black"}));
}, [setDesign]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = async () => {
    // Example: just log the form data on button click
    console.log('Search data:', formData);
    alert(`Searching trains from ${formData.from} to ${formData.to} on ${formData.date}`);
    await axios.post(`${TRAIN_URL}/trains/all`, formData) // use params for GET query
  .then((res) => {console.log(res.data)
    setTrains(res.data);
    console.log(trains);
    // Navigate to trains page without reloading
    navigate('/trains');
  }
  )
  .catch(err => console.error(err));
  };

  // Handler to fill form with card route
  const handleBookNow = (from, to) => {
    setFormData((prev) => ({
      ...prev,
      from,
      to,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <div className="wallpaper"></div>
    <div className="main">
      <div className='subMain'>
      <h1 className="text-4xl md:text-6xl text-center font-bold text-white mb-4 text-balance">
        Book Your Train Journey
      </h1>
      <p className="text-xl text-white text-muted-foreground max-w-auto text-center mx-auto text-pretty m-8">
        Fast, reliable, and comfortable train travel across the country. Find and book your perfect journey today.
      </p>
      <div
        data-slot="card"
  className="trainBox bg-bg text-card-foreground flex flex-col gap-6 rounded-xl border py-6 max-w-4xl mx-auto shadow-lg"
      >
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
        >
          <div data-slot="card-title" className="font-semibold text-center text-2xl">
            Search Trains
          </div>
          <div data-slot="card-description" className="text-muted-foreground text-sm text-center">
            Find the perfect train for your journey
          </div>
        </div>
        <div data-slot="card-content" className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label
                data-slot="label"
                className="text-sm leading-none font-medium select-none flex items-center gap-2"
                htmlFor="from"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin h-4 w-4"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                From
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                id="from"
                placeholder="Departure city"
                value={formData.from}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                data-slot="label"
                className="text-sm leading-none font-medium select-none flex items-center gap-2"
                htmlFor="to"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin h-4 w-4"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                To
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                id="to"
                placeholder="Destination city"
                value={formData.to}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                data-slot="label"
                className="text-sm leading-none font-medium select-none flex items-center gap-2"
                htmlFor="date"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar h-4 w-4"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Date
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                data-slot="label"
                className="text-sm leading-none font-medium select-none flex items-center gap-2"
                htmlFor="trainClass"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star h-4 w-4"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                Class
              </label>
              <select
                id="trainClass"
                value={formData.trainClass}
                onChange={handleChange}
                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                <option value="">Select class</option>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                data-slot="label"
                className="text-sm leading-none font-medium select-none flex items-center gap-2"
                htmlFor="passengers"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users h-4 w-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Passengers
              </label>
              <input
                id="passengers"
                type="number"
                min="1"
                value={formData.passengers}
                onChange={handleChange}
                className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>
          </div>
          <button
            data-slot="button"
            onClick={handleSearch}
            className="text-white inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 hover:text-accent1 rounded-md px-6 mt-6 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tram-front mr-2 h-5 w-5"
            >
              <rect width="16" height="16" x="4" y="3" rx="2"></rect>
              <path d="M4 11h16"></path>
              <path d="M12 3v8"></path>
              <path d="m8 19-2 3"></path>
              <path d="m18 22-2-3"></path>
              <path d="M8 15h.01"></path>
              <path d="M16 15h.01"></path>
            </svg>
            Search Trains
          </button>
        </div>
      </div>
  <section className="py-5 bg">
      <div className="container mx-auto px-4 pb-2 pt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Popular Routes</h2>
          <p className="text-muted-foreground max-w-2xl text-white mx-auto">
            Discover our most traveled destinations and book your journey with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 mb-20" >
          {/* Card 1 */}
          <div
            data-slot="card"
            className=" bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group cardT"
          >
            <div className="relative cardIMG">
              <img
                alt="Mumbai to Delhi"
                className="w-full h-25 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPrhV8E_9NYDUcgRAyxXJASpViq0Hrt50RdeV85KtgXDWMBfyb_uLswLDcrURmGkbNHA&usqp=CAU" // Mumbai-Delhi Rajdhani Express
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹1,500</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Mumbai</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Delhi</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>16h 00m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Mumbai', 'Delhi')}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div
            data-slot="card"
            className="bg-card cardT bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative cardIMG">
              <img
                alt="Chennai to Bengaluru"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://s7ap1.scene7.com/is/image/incredibleindia/vidhana-soudha-bangalore-karnataka-hero?qlt=82&ts=1742199603184" // Chennai Central
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹900</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Chennai</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Bengaluru</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>6h 30m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Chennai', 'Bengaluru')}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div
            data-slot="card"
            className="bg-card cardT bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative cardIMG">
              <img
                alt="Kolkata to Guwahati"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://i.ytimg.com/vi/iVwcRwRDk7c/maxresdefault.jpg" // Howrah Station, Kolkata
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹1,200</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Kolkata</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Guwahati</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>14h 20m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Kolkata', 'Guwahati')}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Card 4 */}
          {/* <div
            data-slot="card"
            className="bg-card cardT bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative cardIMG">
              <img
                alt="Hyderabad to Visakhapatnam"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://www.oyorooms.com/travel-guide/wp-content/uploads/2021/07/Visakhapatnam_Image1-1-1280x720.jpg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹1,000</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Hyderabad</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Visakhapatnam</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>12h 10m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Hyderabad', 'Visakhapatnam')}
              >
                Book Now
              </button>
            </div>
          </div> */}

          {/* Card 5 */}
          {/* <div
            data-slot="card"
            className="bg-card cardT bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative cardIMG">
              <img
                alt="Ahmedabad to Jaipur"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://assets.cntraveller.in/photos/60ba007145469a6a570b1dbf/16:9/w_1024%2Cc_limit/Jal-Mahal-Jaipur-123rf-2-1366x768.jpg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹800</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Ahmedabad</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Jaipur</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>10h 45m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Ahmedabad', 'Jaipur')}
              >
                Book Now
              </button>
            </div>
          </div> */}

          {/* Card 6 */}
          {/* <div
            data-slot="card"
            className="bg-card cardT bg-white text-card-foreground flex flex-col gap-1 rounded-xl pb-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative cardIMG">
              <img
                alt="Pune to Goa"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://assets.cntraveller.in/photos/65169715f1f1534fc4e0f24d/4:3/w_1640,h_1230,c_limit/W%20Goa.jpg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="font-semibold text-primary">₹700</span>
              </div>
            </div>
            <div data-slot="card-content" className="px-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Pune</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <h3 className="font-semibold text-lg">Goa</h3>
              </div>
              <div className="flex items-center text-muted-foreground mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>8h 00m</span>
              </div>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-transparent"
                onClick={() => handleBookNow('Pune', 'Goa')}
              >
                Book Now
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
     {/* <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose RailBook?</h2>
          <p className="text-muted-foreground text-white max-w-2xl mx-auto">
            Experience the best in train travel with our premium services and amenities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock h-8 w-8 text-secondary"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">On-Time Performance</h3>
            <p className="text-muted-foreground">
              99.2% on-time arrival rate with real-time tracking and updates
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star h-8 w-8 text-secondary"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comfort &amp; Luxury</h3>
            <p className="text-muted-foreground">
              Spacious seating, Wi-Fi, dining cars, and premium amenities
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users h-8 w-8 text-secondary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Round-the-clock customer service for all your travel needs</p>
          </div>
        </div>
      </div>
    </section> */}
    </div>
    </div>
    </>
  );
};

export default Home;