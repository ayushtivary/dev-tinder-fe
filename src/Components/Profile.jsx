import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints, Routes } from "../Utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../Store/userSlice"
import EditProfile from "./EditProfile"
import ProfileCards from "./ProfileCards"

const Profile = () => {
    const dispatch = useDispatch()
    const getProfile = async () => {
        try {
            const res = await axios.get(environment + ApiEndPoints.profileUrl, { withCredentials: true })
            dispatch(addUser(res.data))
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getProfile()
    },[])
    const user = useSelector((store)=> store.user)
    return user && (
        <div className="flex flex-wrap p-2 mx-5 justify-evenly">
            <EditProfile data={user}/>
            <div className="mt-5 max-h-[500px]"><ProfileCards data={user.data}/></div>
        </div>
    )
}

export default Profile