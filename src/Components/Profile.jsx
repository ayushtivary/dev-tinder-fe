import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints, Routes } from "../Utils/Constants"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../Store/userSlice"

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
    })

    return (
        <div>
            Profile
        </div>
    )
}

export default Profile