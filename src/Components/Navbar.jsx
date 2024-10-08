import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Routes, ApiEndPoints } from "../Utils/Constants"
import { removeUser } from "../Store/userSlice"
import Cookies from 'js-cookie';
import axios from "axios";
import { environment } from "../Environment/environment";
const Navbar = () => {
    const user = useSelector((store)=> store.user)
    const Dispatch = useDispatch()
    const handleLogout = async () => {
        try{
            const res = await axios.get(environment+ApiEndPoints.logoutUrl, {withCredentials:true})
            Dispatch(removeUser())
            Cookies.remove('token');
        }
        catch(err) {
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
                    {/* <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div> */}
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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