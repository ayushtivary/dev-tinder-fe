import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { environment } from "../Environment/environment"
import { addUser } from "../Store/userSlice"
import { useEffect } from "react"
import axios from "axios"
import { Routes, ApiEndPoints } from "../Utils/Constants"
const Body = () => {
 const user = useSelector((store)=> store.user)
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const fetchUser = async() => {
    try {
        const res = await axios.get(environment + ApiEndPoints.profileUrl, {withCredentials: true})
        dispatch(addUser(res.data))
    }catch (err) {
        navigate(Routes.login)
        console.error(err)
    }
 }
 useEffect(()=> {
    if(user == null){
        fetchUser()
    }
 },[])
    return (
        <div className=""> 
            {user && <Navbar/>}
            <Outlet/>
            {user && <Footer/>}
        </div>
    )
}

export default Body