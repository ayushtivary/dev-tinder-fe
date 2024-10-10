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
    }, [])
    const user = useSelector((store) => store.user)
    return user && (
        <div className="flex p-10 mx-5 justify-between">
            {/* EditProfile should take up half the width */}
            <div className="w-1/2">
                <EditProfile data={user} />
            </div>

            {/* ProfileCards should take up half the width */}
            <div className="w-1/2 mt-5 max-h-[500px] text-center">
                <ProfileCards data={user.data} isProfile={"false"} />
            </div>
        </div>

    )
}

export default Profile