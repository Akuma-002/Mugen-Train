
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserInfo';
import { LoginContext } from './context/LoginInfo';
import indianStatesCities from '../data/indianStatesCities.json';
const API_URL = import.meta.env.VITE_SERVER_API;

const EditProfile = () => {
  // Notification replaced with alert
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

  // Prepare state/district options
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
    <div className="editProfileBox p-6 max-w-4xl mx-auto  space-y-6">
      <h2 className="text-3xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" value={formData.name} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input disabled type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
          <input  type="address" id="address" name="address" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full address" value={formData.address} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="state">State</label>
          <select
            id="state"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="district">District</label>
          <select
            id="district"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="pinCode">Pin Code</label>
          <input type="text" id="pinCode" name="pinCode" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your pin code" value={formData.pinCode} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your date of birth" value={formData.dob} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="aadhar">Aadhar Number</label>
          <input type="number" id="aadhar" name="aadhar" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your Aadhar" value={formData.aadhar} onChange={handleChange}/>
        </div>
        <div className="mb-4"></div>
  <button type="submit" style={{backgroundColor: '#ED4059'}} className="text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:opacity-90">
          Save Changes
        </button>
        <div className="mb-4"></div>
      </form>
    </div>
  );
};

export default EditProfile;

