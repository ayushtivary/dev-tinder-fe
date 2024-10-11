import React, { useCallback, useContext } from "react";
import Context from "../Utils/Context"; // Import context
import axios from "axios";
import { environment } from "../Environment/environment";
import { ApiEndPoints } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../Store/feedSlice"; // Redux action to remove user

const ProfileCards = ({ data, isProfile }) => {
    const { accepted, setAccepted } = useContext(Context); // Access context values
    const dispatch = useDispatch();
    const handleClick = useCallback((status) => {
        setAccepted({ clickstatus: true, message: status, data: data?._id }); // Update context value
    }, [data, setAccepted]);

    const userData = isProfile === "requests"? data?.fromUserId : data;
    const { _id, photoUrl, firstName, lastName, age, gender, about } = userData;
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(environment + ApiEndPoints.sendRequestUrl + status + '/' + userId, {}, { withCredentials: true });
            console.log("userId", userId)
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error(err);
        }
    };
    const checkFeed = useSelector((store)=>store.feed)
    console.log("Feed after update")
    return (
        <div className="flex justify-center text-center">
            <div className="card bg-slate-200 w-96 h-[31.5rem] shadow-xl">
                <figure className="w-full h-48 rounded-full">
                    <img className="object-contain rounded-bl-btn" src={photoUrl} alt="Profile" />
                </figure>
                <div className="card-body">
                    <p className="text-black text-2xl font-semibold justify-center">
                        {firstName + " " + lastName}
                    </p>
                    <p className="text-cyan-700 text-lg font-medium justify-center">
                        {gender + " " + age}
                    </p>
                    <p className="text-cyan-700 text-md bg-slate-100 p-2 rounded-lg font-medium justify-start break-words overflow-y-auto h-24 custom-scrollbar text-justify">
                        {about}
                    </p>
                    {/* For other profiles */}
                    {isProfile !== 'requests' && isProfile !== 'profile' && isProfile !== 'connections' && (
                        <div className="card-actions justify-center text-center mt-5">
                            <button className="btn w-4/12 btn-primary" onClick={() => handleSendRequest("ignore", _id)}>
                                Ignore
                            </button>
                            <button className="btn w-4/12 btn-primary" onClick={() => handleSendRequest("interested", _id)}>
                                Interested
                            </button>
                        </div>
                    )}

                    {/* For requests (accept/reject) */}
                    {isProfile === 'requests' && (
                        <div className="card-actions justify-center text-center mt-5">
                            <button className="btn w-4/12 btn-primary" onClick={() => handleClick("accepted")}>
                                Accept
                            </button>
                            <button className="btn w-4/12 btn-primary" onClick={() => handleClick("rejected")}>
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCards;
