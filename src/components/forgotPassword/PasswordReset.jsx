import React from 'react';
import { useLocation } from 'react-router-dom';

function PasswordReset() {
  // Extract the token from the query parameters
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Use the token to reset the password via an API call
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" name="newPassword" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordReset;
