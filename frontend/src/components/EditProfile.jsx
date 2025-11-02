import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserInfo';
import { LoginContext } from './context/LoginInfo';
import indianStatesCities from '../data/indianStatesCities.json';
const API_URL = import.meta.env.VITE_SERVER_API;

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login, navigate]);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    address: user.address || "",
    phone: user.phone || "",
    pinCode: user.pinCode || "",
    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
    aadhar: user.aadhar || ""
  });
  const [selectedState, setSelectedState] = useState(user.state || "");
  const [selectedDistrict, setSelectedDistrict] = useState(user.district || "");

  const stateOptions = Object.keys(indianStatesCities);
  const districtOptions = selectedState ? indianStatesCities[selectedState] : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/users/update/${user._id || user.id}`, {
        ...formData,
        state: selectedState,
        district: selectedDistrict,
      });
      alert("Profile updated successfully!");
      navigate('/user');
    } catch (error) {
      alert("Error updating profile");
      console.error("Error during profile update:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-white to-purple-100 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white border-0 shadow-2xl rounded-2xl px-8 py-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="email">Email</label>
            <input
              disabled
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-400 focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="state">State</label>
            <select
              id="state"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              value={selectedState}
              onChange={e => {
                setSelectedState(e.target.value);
                setSelectedDistrict("");
              }}
            >
              <option value="">Select State</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="district">District</label>
            <select
              id="district"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">{selectedState ? "Select District" : "Select State First"}</option>
              {districtOptions.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
              placeholder="Enter your pin code"
              value={formData.pinCode}
              onChange={handleChange}
              autoComplete="postal-code"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              placeholder="Enter your date of birth"
              value={formData.dob}
              onChange={handleChange}
              autoComplete="bday"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="aadhar">Aadhar Number</label>
            <input
              type="number"
              id="aadhar"
              name="aadhar"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              placeholder="Enter your Aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Save Button */}
          <div className="col-span-full flex justify-end pt-6">
            <button
              type="submit"
              style={{ backgroundColor: '#ED4059' }}
              className="text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
