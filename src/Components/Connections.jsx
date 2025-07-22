import axios from "../Middleware/axios-wrapper";
import { environment } from "../Environment/environment";
import { ApiEndPoints } from "../Utils/Constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Store/connectionSlice";
import ProfileCards from "./ProfileCards";

const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnectionStore = useSelector((store) => store.connection);
  const [isConnectionFound, setIsConnectionFound] = useState(false);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        environment + ApiEndPoints.fetchConnectionsUrl
      );
      dispatch(addConnections(res.data.data));
      if (res.data.data.length == 0) {
        setIsConnectionFound(false);
      } else {
        setIsConnectionFound(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // if (!fetchConnectionStore) {
    fetchConnections();
    // }
  }, []);
  if (!isConnectionFound) {
    return (
      <div>
        <div className="toast toast-top toast-center mt-20">
          <div className="alert alert-success">
            <span className="text-white">Oops! No Connections found</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-evenly flex-wrap text-center text-white align-middle p-10 m-5 ">
      {fetchConnectionStore &&
        fetchConnectionStore.map((user) => (
          <ProfileCards
            className="mt-2"
            key={user._id}
            data={user}
            isProfile={"connections"}
          />
        ))}
    </div>
  );
};

export default Connections;
