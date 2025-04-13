import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    // Implement signup logic here
    // This could involve redirecting to Auth0's signup page
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
      <Link to="/login" className="mt-4 text-blue-500">Already have an account? Log In</Link>
    </div>
  );
};

export default Signup;
