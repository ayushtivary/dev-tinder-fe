import axios from "axios";
import { environment } from "../Environment/environment";
import { ApiEndPoints } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../Store/requestSlice";
import { useEffect, useState } from "react";
import ProfileCards from "./ProfileCards";
import Context from "../Utils/Context"; // Import the context
import { useContext } from "react";

const Requests = () => {
    const fetchRequest = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const [isConnectionFound, setIsConnectionFound] = useState(false);
    const [accepted, setAccepted] = useState(""); // Context state for accepted requests

    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get(environment + ApiEndPoints.fetchRequestUrl, { withCredentials: true });
            dispatch(addRequest(res.data.data));
            setIsConnectionFound(res.data.data.length > 0);
        } catch (err) {
            console.error(err);
        }
    };
    console.log("request feed", fetchRequest)
    useEffect(() => {
        fetchConnectionRequests();
    }, []);

    const setConnectionRequest = async () => {
        try {
            const res = await axios.post(
                environment + ApiEndPoints.requestResponseUrl + accepted.message + '/' + accepted.data,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(accepted.data)); // Remove from Redux store
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (accepted.clickstatus) {
            setConnectionRequest();
            setAccepted((prev) => ({ ...prev, clickstatus: false }));
        }
    }, [accepted.clickstatus]);

    if (!isConnectionFound) {
        return (
            <div>
                <div className="toast toast-top toast-center mt-20">
                    <div className="alert alert-success">
                        <span className="text-white">Oops! No Connection Requests found</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Context.Provider value={{ accepted, setAccepted }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 text-center text-white align-middle p-10">
                {fetchRequest.length > 0 ? fetchRequest.map((user) => (
                    <ProfileCards
                        className="mt-2"
                        key={user?._id}
                        data={user}
                        isProfile={"requests"}
                    />
                )) : (
                    <div className="toast toast-top toast-center mt-20">
                        <div className="alert alert-success">
                            <span className="text-white">Oops! No Connection Requests found</span>
                        </div>
                    </div>
                )}
            </div>
        </Context.Provider>
    );
};

export default Requests;
