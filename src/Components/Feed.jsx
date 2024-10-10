import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints } from "../Utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Store/feedSlice"
import ProfileCards from "./ProfileCards"

const Feed = () => {
    const dispatch = useDispatch()
    const getFeed = async () => {
        try {
            const res = await axios.get(environment + ApiEndPoints.feedUrl, { withCredentials: true })
            dispatch(addFeed(res.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (!feed) {
            getFeed()
        }
    }, [])
    const feed = useSelector((store) => store.feed)
    return (
        <div className="text-white mt-30 text-center  align-middle p-10 m-5">
            {/* {feed && feed.data.map((user) => (
                <ProfileCards key={user._id} data={feed.data} />
            ))} */}
            {feed && <ProfileCards data={feed.data[0]} isProfile={true}/> }
        </div>
    )
}

export default Feed