import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints } from "../Utils/Constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../Store/requestSlice"
import { useEffect, useState } from "react"
import ProfileCards from "./ProfileCards"

const Requests = () => {
    const fetchRequest = useSelector((store) => store.request)
    const dispatch = useDispatch()
    const [isConnectionFound, setIsConnectionFound] = useState(false)
    const fetchConnectionRequests = async () => {
        const res = await axios.get(environment + ApiEndPoints.fetchRequestUrl, { withCredentials: true })
        dispatch(addRequest(res.data.data))
        if (res.data.data.length == 0) {
            setIsConnectionFound(false)
        }
        else{
            setIsConnectionFound(true)
        }
    }
    useEffect(() => {
        // if (!fetchRequest) {
            fetchConnectionRequests()
        // }
    }, [])
    console.log(isConnectionFound)
    if (!isConnectionFound) {
        return (
            <div>
                <div className="toast toast-top toast-center mt-20">
                    <div className="alert alert-success">
                        <span className="text-white">Oops! No Connection Requests found</span>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className="flex justify-evenly flex-wrap text-center text-white align-middle p-10 m-5 ">
            {fetchRequest && fetchRequest.map((user) => (
                <ProfileCards className="mt-2" key={user._id} data={user.fromUserId} isProfile={"requests"} />
            ))}
        </div>
    )
}
export default Requests