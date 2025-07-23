import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useEffect } from "react";
import { Routes } from "../Utils/Constants";
import { fetchPhotoUrlApi } from "../Api/ProfileApi";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await fetchPhotoUrlApi();
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