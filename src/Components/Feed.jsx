import axios from "axios"
import { environment } from "../Environment/environment"
import { ApiEndPoints } from "../Utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Store/feedSlice"

const Feed = () => {
    const feed = useSelector((store)=> store.feed)
    const dispatch = useDispatch()
    const getFeed = async () => {
        try{
            const res = await axios.get(environment+ApiEndPoints.feedUrl, {withCredentials:true})
            dispatch(addFeed(res.data))
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(!feed){
            getFeed()
        }
    },[])
    return (
        <div className="text-white mt-30">
           Feed
        </div>
    )
}

export default Feed