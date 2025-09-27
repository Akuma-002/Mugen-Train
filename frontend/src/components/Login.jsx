import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginInfo from './context/LoginInfo';
import { LoginContext } from './context/LoginInfo';
import { UserContext } from './context/UserInfo';

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_API;
  console.log("Loaded API URL:", import.meta.env.VITE_SERVER_API);
  const {login, setLogin} = useContext(LoginContext);
  const {user, setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const checkButton = () =>{
    if(!formData.email||!formData.password){
      return true;
    }
    else{
      return false;
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password
        }
      );
      if (response.data.success) {
        console.log('Login successful:', response.data);
        setUser({...user, ...response.data.user});
        console.log(user);
        setLogin(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
    }
  };

  return (
    <form
      className="flex formBox flex-col items-center text-sm text-slate-800"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold py-4 text-center">
        <NavLink to="/" className="text-black">
          Login
        </NavLink>
      </h1>
      <div className="max-w-96 w-full px-4">
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
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="password"
            name="password"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={checkButton()}
          className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition disabled:opacity-50"
        >
          Login
        </button>
        <p>Don't have an account <NavLink to={"/signup"}>Sign Up</NavLink></p>
      </div>
    </form>
  );
}

export default Login