import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_API;
  console.log("Loaded API URL:", import.meta.env.VITE_SERVER_API);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',

  });

  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validatePassword(formData.password)) {
      setPasswordError(
        'Password must be at least 8 chars, include uppercase, lowercase, number & special char.'
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/signup`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );
      if (response.data.success) {
        console.log('Signup successful:', response.data);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setPasswordError(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex formBox flex-col items-center text-sm text-slate-800"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold py-4 text-center">
        <NavLink to="/" className="text-wheat-500 hover:text-wheat-700">
          Sign Up
        </NavLink>
      </h1>
      <div className="max-w-96 w-full px-4">
        {/* Name */}
        <label htmlFor="name" className="font-medium">
          Full Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="text"
            name="name"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <label htmlFor="phone" className="font-medium">
          Mobile Number
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="number"
            name="phone"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="email"
            name="email"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="password"
            name="password"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm Password
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="password"
            name="confirmPassword"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Error */}
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition disabled:opacity-50"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p>Already have an account <NavLink className={"text-blue-700"} to={"/login"}>Login</NavLink></p>
      </div>
    </form>
  );
};

export default SignUp;
