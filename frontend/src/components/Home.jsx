import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { TrainListContext } from './context/TrainList';
import { useNavigate } from 'react-router-dom';
import { DesignContext } from './context/DesignInfo';

const TRAIN_URL = import.meta.env.VITE_TRAIN_SERVER_API;
const Home = () => {
  const { trains, setTrains } = useContext(TrainListContext);
  const { setDesign } = useContext(DesignContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    trainClass: '',
    passengers: 1,
  });

  useEffect(() => {
    setDesign((prev) => ({ ...prev, navbarColor: "bg-transparent", navTextColor: "text-black" }));
  }, [setDesign]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = async () => {
    console.log('Search data:', formData);
    alert(`Searching trains from ${formData.from} to ${formData.to} on ${formData.date}`);
    await axios.post(`${TRAIN_URL}/trains/all`, formData)
      .then((res) => {
        console.log(res.data);
        setTrains(res.data);
        navigate('/trains');
      })
      .catch(err => console.error(err));
  };

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

      {/* Page wrapper */}
      <div className="main relative">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Book Your Train Journey
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
              Fast, reliable and comfortable train travel across the country. Find and book your perfect journey today.
            </p>
          </div>

          {/* Search Card - Reworked to solid dark card with accent */}
          <div className="mt-8">
            <div className="mx-auto max-w-4xl bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all hover:-translate-y-1">
              {/* decorative accent bar */}
              <div className="h-1 w-28 rounded-full bg-gradient-to-r from-primary to-purple-600 mb-4 shadow-sm mx-auto"></div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl text-white font-semibold">Search Trains</h3>
                  <p className="text-sm text-slate-300">Find the perfect train for your journey</p>
                </div>
                <div className="hidden md:flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-emerald-700/20 text-emerald-200">Safe</span>
                  <span className="px-3 py-1 rounded-full bg-sky-700/20 text-sky-200">On-time</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="from" className="text-sm text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    From
                  </label>
                  <input id="from" placeholder="Departure city" value={formData.from} onChange={handleChange}
                    className="h-10 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="to" className="text-sm text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    To
                  </label>
                  <input id="to" placeholder="Destination city" value={formData.to} onChange={handleChange}
                    className="h-10 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="date" className="text-sm text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                    Date
                  </label>
                  <input id="date" type="date" value={formData.date} onChange={handleChange}
                    className="h-10 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="trainClass" className="text-sm text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    Class
                  </label>
                  <select id="trainClass" value={formData.trainClass} onChange={handleChange}
                    className="h-10 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 text-slate-100 focus:ring-2 focus:ring-primary/30 outline-none">
                    <option value="">Select class</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="passengers" className="text-sm text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Passengers
                  </label>
                  <input id="passengers" type="number" min="1" value={formData.passengers} onChange={handleChange}
                    className="h-10 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 text-slate-100 focus:ring-2 focus:ring-primary/30 outline-none" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button onClick={handleSearch}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-lg transition transform hover:-translate-y-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="16" height="16" x="4" y="3" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path></svg>
                  Search Trains
                </button>

                <button onClick={() => { setFormData({ from: '', to: '', date: '', trainClass: '', passengers: 1 }); }}
                  className="text-slate-300 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition">
                  Reset
                </button>

                <div className="ml-auto text-sm text-slate-400 hidden sm:block">
                  Tip: Try popular routes below for faster booking.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Popular Routes</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">Discover our most traveled destinations and book your journey with confidence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <article className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPrhV8E_9NYDUcgRAyxXJASpViq0Hrt50RdeV85KtgXDWMBfyb_uLswLDcrURmGkbNHA&usqp=CAU"
                    alt="Mumbai to Delhi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-slate-800/70 text-white px-3 py-1 rounded-full text-sm">Popular</div>
                  <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full font-semibold">₹1,500</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-lg font-semibold">Mumbai</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      <h3 className="text-white text-lg font-semibold">Delhi</h3>
                    </div>
                    <span className="text-sm text-slate-400">Rajdhani</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>16h 00m</span>
                    <span className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm">Seats available</span>
                  </div>

                  <button onClick={() => handleBookNow('Mumbai', 'Delhi')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition hover:brightness-105">
                    Book Now
                  </button>
                </div>
              </article>

              {/* Card 2 */}
              <article className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://s7ap1.scene7.com/is/image/incredibleindia/vidhana-soudha-bangalore-karnataka-hero?qlt=82&ts=1742199603184"
                    alt="Chennai to Bengaluru" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full font-semibold">₹900</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-sky-500"></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-lg font-semibold">Chennai</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      <h3 className="text-white text-lg font-semibold">Bengaluru</h3>
                    </div>
                    <span className="text-sm text-slate-400">Shatabdi</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>6h 30m</span>
                    <span className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm">Fast</span>
                  </div>

                  <button onClick={() => handleBookNow('Chennai', 'Bengaluru')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition hover:brightness-105">
                    Book Now
                  </button>
                </div>
              </article>

              {/* Card 3 */}
              <article className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://i.ytimg.com/vi/iVwcRwRDk7c/maxresdefault.jpg"
                    alt="Kolkata to Guwahati" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full font-semibold">₹1,200</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-400"></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white text-lg font-semibold">Kolkata</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      <h3 className="text-white text-lg font-semibold">Guwahati</h3>
                    </div>
                    <span className="text-sm text-slate-400">Express</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>14h 20m</span>
                    <span className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm">Comfort</span>
                  </div>

                  <button onClick={() => handleBookNow('Kolkata', 'Guwahati')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition hover:brightness-105">
                    Book Now
                  </button>
                </div>
              </article>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;