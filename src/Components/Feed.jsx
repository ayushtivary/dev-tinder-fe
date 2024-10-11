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
        getFeed()
    }, [])
    const feed = useSelector((store) => store.feed)
    if (feed?.data?.length == 0) {
        return (
            <div className="toast toast-top toast-center mt-20">
                <div className="alert alert-success">
                    <span className="text-white">Oops! No More users found in feed</span>
                </div>
            </div>
        )
    }
    console.log("feed length", feed)
    return (
        <div className="text-white text-center  align-middle p-10">
            {/* {feed && feed.data.map((user) => (
                <ProfileCards key={user._id} data={feed.data} />
            ))} */}
            {feed !== null ?
                (<ProfileCards data={feed?.data[0]} isProfile={true} />) :
                (
                    <div className="toast toast-top toast-center mt-20">
                        <div className="alert alert-success">
                            <span className="text-white">Oops! No More users found in feed</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Feed