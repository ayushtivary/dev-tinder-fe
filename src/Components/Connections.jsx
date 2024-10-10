import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints } from "../Utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../Store/connectionSlice"
import ProfileCards from "./ProfileCards"

const Connections = () => {
    const dispatch = useDispatch()
    const fetchConnectionStore = useSelector((store) => store.connection)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(environment + ApiEndPoints.fetchConnectionsUrl, { withCredentials: true })
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (!fetchConnectionStore) {
            fetchConnections()
        }
    }, [])
    return (
        <div className="flex justify-evenly flex-wrap text-center text-white align-middle p-10 m-5 ">
        
            {fetchConnectionStore && fetchConnectionStore.map((user) => (
                <ProfileCards className="mt-2" key={user._id} data={user} />
            ))}
        </div>
    )
}

export default Connections