import React, { useState } from 'react';
import EyeOpenIcon from '../../assets/blue-eye.png';
import EyeClosedIcon from '../../assets/closed-eye.png';

function PasswordInput() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password) {
      setPasswordMatch(e.target.value === password);
    }
  };

  return (
    <div>
      <div className="relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max">
        Password
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <img src={EyeOpenIcon} alt="Hide Password" className='w-10'/>
          ) : (
            <img src={EyeClosedIcon} alt="Show Password" className='w-12'/>
          )}
        </button>
      </div>
      <div>
        <div className="relative z-10 ml-3 text-gray-300 text-md pt-5 max-w-max">
          Confirm Password
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
            placeholder="Retype your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? (
              <img src={EyeOpenIcon} alt="Hide Password" className='w-10'/>
            ) : (
              <img src={EyeClosedIcon} alt="Show Password" className='w-12'/>
            )}
          </button>
        </div>
        {password && confirmPassword && !passwordMatch && (
          <p className="text-red-600 text-sm">Password does not match</p>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
