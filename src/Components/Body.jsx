import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { environment } from "../Environment/environment"
import { addUser } from "../Store/userSlice"
import { useEffect } from "react"
import axios from "../Middleware/axios-wrapper";
import { Routes, ApiEndPoints } from "../Utils/Constants";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(environment + ApiEndPoints.profileUrl);
      dispatch(addUser(res.data));
    } catch (err) {
      navigate(Routes.login);
      console.error(err);
    }
  };
  useEffect(() => {
    if (user == null) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      {user && <Navbar />}
      <Outlet />
      <div className="hidden sm:block">{user && <Footer />}</div>
    </div>
  );
};

export default Body