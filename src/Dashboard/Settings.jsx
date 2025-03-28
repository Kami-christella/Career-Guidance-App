import React, { useState, useEffect } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import "./Dashboard_Styles/Settings.css";

function Settings() {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
           (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Password-related states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Effect to apply theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validation checks
    if (newPassword !== confirmPassword) {
      Notify.failure('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Notify.failure('Password must be at least 8 characters long');
      return;
    }

    try {
      // API call to change password
      await axios.post('/api/change-password', { 
        oldPassword, 
        newPassword 
      }, {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('userToken')}` 
        }
      });

      // Success handling
      Notify.success('Password changed successfully');

      // Reset password fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Error handling
      console.error('Password change error:', error);
      Notify.failure(error.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="settings-container">
      <div className="p-4 bg-white dark:bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
        

          {/* Password Change Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="max-w-md">
              {/* Old Password Input */}
              <div className="mb-4">
                <label className="block mb-2 dark:text-white">Old Password</label>
                <div className="flex items-center">
                  <input 
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowOldPassword(!showOldPassword)} 
                    className="iconSettings ml-2"
                  >
                    {showOldPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password Input */}
              <div className="mb-4">
                <label className="block mb-2 dark:text-white">New Password</label>
                <div className="flex items-center">
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)} 
                    className="iconSettings ml-2"
                  >
                    {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label className="block mb-2 dark:text-white">Confirm Password</label>
                <div className="flex items-center">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="iconSettings ml-2"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-success bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Change Password
              </button>
              <br/>
              <br/> <br/>
              <br/> <br /> <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;