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
    const checkFeed = useSelector((store)=>store.feed)
    const userData = isProfile === "requests" ? data?.fromUserId : data;
    const { _id, photoUrl, firstName, lastName, age, gender, about } = userData;
    const handleSendRequest = async (status, userId) => {
      try {
        const res = await axios.post(
          environment + ApiEndPoints.sendRequestUrl + status + "/" + userId,
          {},
          { withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="flex justify-center text-center bg-gray-900 min-h-screen">
        <div className="card bg-gradient-to-br from-gray-800 to-gray-700 text-white w-96 h-[32.5rem] shadow-2xl rounded-2xl border border-gray-600">
          <figure className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-700 rounded-t-2xl">
            <img
              className="object-contain max-h-full"
              src={
                photoUrl?.startsWith("data:image")
                  ? photoUrl
                  : `data:image/jpeg;base64,${photoUrl}`
              }
              alt="Profile"
            />
          </figure>
          <div className="card-body px-6 py-4 space-y-3">
            <p className="text-white text-2xl font-semibold">
              {firstName + " " + lastName}
            </p>
            <p className="text-cyan-300 text-lg font-medium">
              {gender + " • " + age}
            </p>
            <p className="text-cyan-100 text-md bg-gray-600/60 p-3 rounded-lg font-medium break-words overflow-y-auto h-24 custom-scrollbar text-justify">
              {about}
            </p>

            {/* For other profiles */}
            {isProfile !== "requests" &&
              isProfile !== "profile" &&
              isProfile !== "connections" && (
                <div className="card-actions justify-center mt-5 flex gap-4">
                  <button
                    className="btn w-4/12 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleSendRequest("ignore", _id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn w-4/12 bg-emerald-500 hover:bg-emerald-600 text-white"
                    onClick={() => handleSendRequest("interested", _id)}
                  >
                    Interested
                  </button>
                </div>
              )}

            {/* For requests (accept/reject) */}
            {isProfile === "requests" && (
              <div className="card-actions justify-center mt-5 flex gap-4">
                <button
                  className="btn w-4/12 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleClick("accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn w-4/12 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleClick("rejected")}
                >
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
