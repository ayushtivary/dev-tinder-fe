import axios from "../Middleware/axios-wrapper";
import { useState } from "react";
import { environment } from "../Environment/environment";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { Routes, ApiEndPoints } from "../Utils/Constants";
import { loginApi, signupApi, logoutApi } from "../Api/AuthApi";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginApi({ emailId, password });
      Dispatch(addUser(res.data));
      return navigate(Routes.feed);
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };

  const handleSignin = (event) => {
    setLogin(event);
    setSuccessMessage("");
  };

  const handleSignUp = async () => {
    try {
      const res = await signupApi({
        firstName,
        lastName,
        emailId,
        password,
      });
      setLogin(true);
      setSuccessMessage("User registered successfully!");
      return navigate(Routes.login);
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };

  const handleLoginKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      <div
        className="card w-96 bg-gray-800 shadow-2xl m-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        data-theme="dark"
      >
        <div className="card-body items-center text-center p-8">
          <h2 className="card-title text-3xl font-bold text-white mb-6">
            {login ? "Welcome Back!" : "Join Us!"}
          </h2>

          {successMessage && (
            <div className="toast toast-top toast-center mt-20">
              <div className="alert alert-success">
                <span className="text-white">{successMessage}</span>
              </div>
            </div>
          )}

          <div className="w-full space-y-4">
            {!login && (
              <>
                <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 text-indigo-400"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow text-white placeholder-gray-400"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFname(e.target.value)}
                    aria-label="First Name"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 text-indigo-400"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow text-white placeholder-gray-400"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLname(e.target.value)}
                    aria-label="Last Name"
                  />
                </label>
              </>
            )}
            <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-indigo-400"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-white placeholder-gray-400"
                placeholder="Email"
                value={emailId}
                onKeyDown={handleLoginKeyDown}
                onChange={(e) => setEmailId(e.target.value)}
                aria-label="Email address"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-indigo-400"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow text-white placeholder-gray-400"
                placeholder="Password"
                value={password}
                onKeyDown={handleLoginKeyDown}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </label>
            {error && (
              <p className="text-red-400 text-sm font-medium">{error}</p>
            )}
          </div>

          {login ? (
            <>
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn bg-indigo-600 text-white w-64 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.7)] transition-all duration-300 text-lg font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-indigo-400 text-sm">
                  Don't have an account?
                  <span
                    className="ml-1 font-semibold hover:text-indigo-300 cursor-pointer transition-colors"
                    role="button"
                    onClick={() => handleSignin(false)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn bg-indigo-600 text-white w-64 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.7)] transition-all duration-300 text-lg font-semibold"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center mt-4">
                <p
                  className="text-indigo-400 font-semibold hover:text-indigo-300 cursor-pointer transition-colors"
                  role="button"
                  onClick={() => handleSignin(true)}
                >
                  Back to Login
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
