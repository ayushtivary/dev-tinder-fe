import axios from "../Middleware/axios-wrapper";
import { useState } from "react";
import { environment } from "../Environment/environment";
import { ApiEndPoints } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileSchema } from "../Utils/Validation"; // Import the validation schema
import Loader from "../Utils/Loader";
import { editProfileApi } from "../Api/ProfileApi";

const EditProfile = (data) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // Set initial loading to false

  // intial values for the form
  const initialValues = {
    firstName: data?.data?.data?.firstName || "",
    lastName: data?.data?.data?.lastName || "",
    age: data?.data?.data?.age || "",
    gender: data?.data?.data?.gender || "",
    about: data?.data?.data?.about || "",
    photo: data?.data?.data?.photo || "",
  };

  // Function to handle form submission
  const handleSaveProfile = async (values, { setSubmitting, resetForm }) => {
    setLoading(true); // Start loader
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("age", values.age);
    formData.append("gender", values.gender);
    formData.append("about", values.about);

    // Ensure photoUrl is a File object before appending
    if (values.photo && values.photo instanceof File) {
      formData.append("photo", values.photo);
    } else if (values.photo) {
      console.error("photo is not a valid file");
    }
    try {
      const res = await editProfileApi(formData);
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      resetForm();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    setLoading(false); // Stop loader
    setSubmitting(false);
  };

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }

  // Render the form
  return (
    <div className="flex justify-center w-full rounded-2xl p-6">
      <div
        className="card w-11/12 max-h-[700px] rounded-lg shadow-xl text-white border-sky-400 border-4 "
        data-theme="winter"
      >
        <div className="card-body items-center text-center overflow-y-auto max-h-[500px] scrollbar-hide">
          <h2 className="card-title text-2xl mb-4">PROFILE</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={profileSchema}
            onSubmit={handleSaveProfile}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full max-w-md mx-auto space-y-4">
                <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
                  <Field
                    type="text"
                    name="firstName"
                    className="grow"
                    placeholder="First Name"
                  />
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
                  <Field
                    type="text"
                    name="lastName"
                    className="grow"
                    placeholder="Last Name"
                  />
                </label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full bg-base-100 text-white border-sky-400 border-2"
                  onChange={(e) =>
                    setFieldValue("photo", e.currentTarget.files[0])
                  }
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
                  <Field
                    type="number"
                    name="age"
                    className="grow"
                    placeholder="Age"
                  />
                </label>
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <Field
                  as="select"
                  name="gender"
                  className="select select-bordered w-full rounded-lg bg-base-100 text-white border-sky-400 border-2"
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <Field
                  as="textarea"
                  name="about"
                  className="textarea textarea-bordered rounded-lg w-full bg-base-100 text-white border-sky-400 border-2"
                  placeholder="Bio"
                  maxLength="200"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-400 text-xs font-medium"
                />

                <div className="card-actions justify-center mt-6">
                  <button
                    type="submit"
                    className="btn btn-accent rounded-lg w-60 text-lg hover:brightness-110"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Profile"}
                  </button>
                </div>
                {showToast && (
                  <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                      <span>Profile Updated Successfully</span>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
