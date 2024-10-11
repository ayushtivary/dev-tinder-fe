import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Routes, ApiEndPoints } from "../Utils/Constants"
import { removeUser } from "../Store/userSlice"
import Cookies from 'js-cookie';
import axios from "axios";
import { environment } from "../Environment/environment";
// import { removeFeed } from "../Store/feedSlice";
import { removeConnections } from "../Store/connectionSlice";
const Navbar = () => {
    const user = useSelector((store) => store.user)
    const Dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            const res = await axios.get(environment + ApiEndPoints.logoutUrl, { withCredentials: true })
            Dispatch(removeUser())
            // Dispatch(removeFeed())
            Dispatch(removeConnections())
            Cookies.remove('token');
        }
        catch (err) {
            console.error(err)
        }

    }

    return (
        <>
            <div className="navbar bg-base-300" data-theme="cupcake" >
                <div className="flex-1">
                    <Link to={Routes.feed} className="btn btn-ghost text-xl">Dev</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end mx-5">
                        <div className="flex">
                            <p className="mt-3 px-4 font-medium">
                                Welcome!  {user.data.firstName}
                            </p>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.data.photoUrl} />
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={Routes.profile} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={Routes.connection} className="justify-between">
                                    Connections
                                </Link>
                            </li>
                            <li>
                                <Link to={Routes.request} className="justify-between">
                                    Requests
                                </Link>
                            </li>
                            {/* <li><a>Settings</a></li> */}
                            <li onClick={handleLogout}><Link to={Routes.login}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar