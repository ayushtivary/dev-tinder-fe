import axios from "axios";
import { useState } from "react";
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
    const dispatch = useDispatch()
    const handleSaveProfile = async () => {
        const res = await axios.post(environment + ApiEndPoints.saveProfileUrl, {firstName,lastName,age,gender,about, photoUrl}, {withCredentials:true})
        dispatch(addUser(res.data))
    }
    return (
        <div className="flex justify-center mt-5 rounded-2xl bg-slate-200 w-full scrollbar-hidden">
            <div
                className="card text-neutral-content text-center rounded-lg w-11/12  max-h-[700px]"
                data-theme="nord"
            >
                <div
                    className="card-body items-center text-center overflow-y-auto max-h-[500px]"
                >
                    <h2 className="card-title text-black">Edit Profile</h2>

                    <div className="text-black w-full">
                        <label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <input
                                type="text"
                                className="grow text-black"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <input
                                type="text"
                                className="grow text-black"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <input
                                type="text"
                                className="grow text-black"
                                placeholder="Photo Url"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 m-7 rounded-lg text-black">
                            <input
                                type="text"
                                className="grow text-black"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>

                        <select className="select select-bordered w-[90%] flex items-center gap-2 m-7 rounded-lg" value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            <option disabled selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <textarea className="rounded-lg textarea textarea-bordered text-black w-[88%]"
                            placeholder="Bio"
                            value={about}
                            maxLength="200"
                            onChange={(e) => setAbout(e.target.value)}></textarea>
                    </div>

                    <div className="card-actions justify-end mt-1">
                        <button className="btn rounded-lg hover:bg-slate-800 w-60 hover:text-white text-lg" onClick={handleSaveProfile}>
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
