import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Store/userSlice";
import EditProfile from "./EditProfile";
import ProfileCards from "./ProfileCards";
import { profileApi } from "../Api/ProfileApi";
import Loader from "../Utils/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getProfile = async () => {
    try {
      const res = await profileApi();
      setLoading(true);
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Get user data from Redux store
  const user = useSelector((store) => store.user);

  if (loading) {
    return <Loader />;
  }
  return (
    user && (
      <div className="flex flex-col lg:flex-row p-10 mx-5 justify-between">
        {/* EditProfile should take up full width on mobile and half on larger screens */}
        <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
          <EditProfile data={user} />
        </div>

        {/* ProfileCards should take up full width on mobile and half on larger screens */}
        <div className="w-full lg:w-1/2 mt-5 lg:mt-5 max-h-[500px] text-center">
          <ProfileCards data={user.data} isProfile={"profile"} />
        </div>
      </div>
    )
  );
};

export default Profile;
