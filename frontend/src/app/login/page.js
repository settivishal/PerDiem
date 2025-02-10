"use client";

import Image from 'next/image';
import myImg from '../zine.png';
import { useState } from 'react';

export default function LoginPage() {
    // State variables for form inputs
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Error message state


    // Handle form submission from Login Button
    const handleLogin = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
    
      if (!identifier || !password) {
        setErrorMessage("Please enter both email/username and password.");
        return;
      }
    
      const payload = {
        email: identifier,
        password: password,
      };
    
      try {
        const response = await fetch("http://localhost:8080/consumer/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Login failed.");
          return;
        }
    
        const data = await response.json();
        // Store tokens and redirect or update UI as needed
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.href = "/profile"; // Redirect upon success
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    };
    
    // Add this function inside your LoginPage component
    // Add this function inside your LoginPage component
    const handleGoogleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/auth/google", {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to initiate Google authentication");
        }

        const data = await response.json();
        // Redirect to Google's consent page
        if (data.auth_url) {
          window.location.href = data.auth_url;
        } else {
          throw new Error("Invalid authentication URL");
        }
      } catch (error) {
        console.error("Google login error:", error);
        setErrorMessage("Failed to initiate Google login");
      }
    };
    
    
    

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        {/* Main Login Card */}
        <div className="w-full max-w-xs bg-white border border-gray-300 rounded-lg p-8">
          {/* Zine Logo */}
          <div className="flex justify-center mb-6">
            <Image src={myImg}  width={70} height={70} alt="Zine" />
          </div>
          <form>
            <input
              type="text"
              placeholder="Email"
              className="mb-3 w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-3 w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <div className="mb-4 flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                <span>{errorMessage}</span>
                <button
                  onClick={() => setErrorMessage('')}
                  className="ml-4 font-bold focus:outline-none"
                >
                  X
                </button>
              </div>
            )}

            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600 transition"
              onClick={handleLogin} // Call handleLogin function on click
            >
              Log In
            </button>
            <div className="text-center text-sm text-gray-500 my-4">OR</div>
            <div className="text-center">
            <button
              type="button"
              onClick={handleGoogleLogin} // Call handleGoogleLogin function on click
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </button>
          </div>


          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 font-semibold">
              Forgot password?
            </a>
          </div>
        </div>
        {/* Sign Up Card */}
        <div className="w-full max-w-xs bg-white border border-gray-300 rounded-lg p-4 text-center text-sm">
          <span className="text-gray-700">Don't have an account?</span>{' '}
          <a href="#" className="text-blue-600 font-semibold">
            Sign up
          </a>
        </div>

      </div>
    );
  }
  