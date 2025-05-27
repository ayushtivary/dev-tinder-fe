import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "../Environment/environment";
import { ApiEndPoints } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";

const EditProfile = (data) => {
  const [firstName, setFname] = useState(data?.data?.data?.firstName);
  const [lastName, setLname] = useState(data?.data?.data?.lastName);
  const [photoUrl, setPhotoUrl] = useState(data?.data?.data?.photoUrl);
  const [age, setAge] = useState(data?.data?.data?.age);
  const [gender, setGender] = useState(data?.data?.data?.gender);
  const [about, setAbout] = useState(data?.data?.data?.about);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  console.log("data", data?.data?.data);
  console.log("photoUrl", photoUrl);
  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("about", about);

    // Ensure photoUrl is a File object before appending
    if (photoUrl instanceof File) {
      formData.append("photo", photoUrl);
    } else {
      console.error("photoUrl is not a valid file");
    }
    try {
      const res = await axios.post(
        environment + ApiEndPoints.saveProfileUrl,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // required for FormData
          },
        }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  console.log("show toast", showToast);
  return (
    <div className="flex justify-center w-full rounded-2xl p-6 ">
      <div
        className="card w-11/12 max-h-[700px] rounded-lg shadow-xl text-white border-sky-400 border-4 "
        data-theme="winter"
      >
        <div className="card-body items-center text-center overflow-y-auto max-h-[500px] scrollbar-hide">
          <h2 className="card-title text-2xl mb-4">PROFILE</h2>

          <div className="w-full max-w-md mx-auto space-y-4">
            <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-base-100 text-white border-sky-400 border-2"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />

            <label className="input input-bordered flex items-center gap-2 rounded-lg bg-base-100 text-white border-sky-400 border-2">
              <input
                type="text"
                className="grow"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <select
              className="select select-bordered w-full rounded-lg bg-base-100 text-white border-sky-400 border-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled selected>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <textarea
              className="textarea textarea-bordered rounded-lg w-full bg-base-100 text-white border-sky-400 border-2"
              placeholder="Bio"
              value={about}
              maxLength="200"
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-accent rounded-lg w-60 text-lg hover:brightness-110"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </div>

          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile Updated Successfully</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
