import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { Routes } from "../Utils/Constants";
import { loginApi, signupApi } from "../Api/AuthApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema, signupSchema } from "../Utils/Validation";
import Loader from "../Utils/Loader";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submit handlers
  const handleLogin = async (values, { setSubmitting }) => {
    setApiError("");
    try {
      const res = await loginApi({
        emailId: values.emailId,
        password: values.password,
      });
      dispatch(addUser(res.data));
      navigate(Routes.feed);
    } catch (err) {
      setApiError(err?.response?.data || "Login failed");
    }
    setSubmitting(false);
  };

  // Sign up handler
  const handleSignUp = async (values, { setSubmitting }) => {
    setApiError("");
    try {
      const res = await signupApi({
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.emailId,
        password: values.password,
      });
      setLogin(true);
      setSuccessMessage("User registered successfully!");
      navigate(Routes.login);
    } catch (err) {
      setApiError(err?.response?.data || "Signup failed");
    }
    setSubmitting(false);
  };

  // Define initial values
  const loginInitialValues = { emailId: "", password: "" };
  const signupInitialValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  };

  // Render the component
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

          <Formik
            initialValues={login ? loginInitialValues : signupInitialValues}
            validationSchema={login ? loginSchema : signupSchema}
            onSubmit={login ? handleLogin : handleSignUp}
          >
            {({ isSubmitting }) => (
              <>
                {isSubmitting && <Loader />}
                <Form className="w-full space-y-4">
                  {!login && (
                    <>
                      <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                        <Field
                          type="text"
                          name="firstName"
                          className="grow text-white placeholder-gray-400 bg-transparent border-none outline-none"
                          placeholder="First Name"
                          aria-label="First Name"
                        />
                      </label>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-400 text-xs font-medium"
                      />

                      <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                        <Field
                          type="text"
                          name="lastName"
                          className="grow text-white placeholder-gray-400 bg-transparent border-none outline-none"
                          placeholder="Last Name"
                          aria-label="Last Name"
                        />
                      </label>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-400 text-xs font-medium"
                      />
                    </>
                  )}

                  <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                    <Field
                      type="text"
                      name="emailId"
                      className="grow text-white placeholder-gray-400 bg-transparent border-none outline-none"
                      placeholder="Email"
                      aria-label="Email address"
                    />
                  </label>
                  <ErrorMessage
                    name="emailId"
                    component="div"
                    className="text-red-400 text-xs font-medium"
                  />

                  <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 focus-within:border-indigo-500 rounded-xl transition-colors">
                    <Field
                      type="password"
                      name="password"
                      className="grow text-white placeholder-gray-400 bg-transparent border-none outline-none"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-xs font-medium"
                  />

                  {apiError && (
                    <p className="text-red-400 text-sm font-medium">
                      {apiError}
                    </p>
                  )}

                  <div className="card-actions justify-center mt-6">
                    <button
                      type="submit"
                      className="btn bg-indigo-600 text-white w-64 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.7)] transition-all duration-300 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {login ? "Login" : "Sign Up"}
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>

          {login ? (
            <div className="text-center mt-4">
              <p className="text-indigo-400 text-sm">
                Don't have an account?
                <span
                  className="ml-1 font-semibold hover:text-indigo-300 cursor-pointer transition-colors"
                  role="button"
                  onClick={() => {
                    setLogin(false);
                    setSuccessMessage("");
                    setApiError("");
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p
                className="text-indigo-400 font-semibold hover:text-indigo-300 cursor-pointer transition-colors"
                role="button"
                onClick={() => {
                  setLogin(true);
                  setSuccessMessage("");
                  setApiError("");
                }}
              >
                Back to Login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
