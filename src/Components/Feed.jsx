import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Store/feedSlice";
import ProfileCards from "./ProfileCards";
import { feedApi } from "../Api/FeedApi"; // Import the feed API function
import Loader from "../Utils/Loader";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getFeed = async () => {
    try {
      const res = await feedApi();
      setLoading(true);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Fetch feed data when the component mounts
  useEffect(() => {
    getFeed();
  }, []);
  const feed = useSelector((store) => store.feed);
  if (feed?.data?.length == 0) {
    return (
      <div className="toast toast-top toast-center mt-20">
        <div className="alert alert-success">
          <span className="text-white">Oops! No More users found in feed</span>
        </div>
      </div>
    );
  }

  // If loading, show the Loader component
  if (loading) {
    return <Loader />;
  }

  // Render the feed data
  return (
    <div className="text-white text-center  align-middle p-10">
      {/* {feed && feed.data.map((user) => (
                <ProfileCards key={user._id} data={feed.data} />
            ))} */}
      {feed !== null ? (
        <ProfileCards data={feed?.data[0]} isProfile={true} />
      ) : (
        <div className="toast toast-top toast-center mt-20">
          <div className="alert alert-success">
            <span className="text-white">
              Oops! No More users found in feed
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
