import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function VideoList() {
  const [api, setApi] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);

  const getAPI = (pageToken = "") => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=VN&pageToken=${pageToken}&key=AIzaSyBVqEpn7vLsFPAGo4gL6-Jbe3EnbmEprIE`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        return res.json();
      })
      .then((data) => {
        setApi((prevApi) => [...prevApi, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAPI();
  }, []);


  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      !loading
    ) {
      getAPI(nextPageToken);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken, loading]);

  const convertISO8601ToDuration = (isoDuration) => {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = isoDuration.match(regex);

    let hours = matches[1] ? parseInt(matches[1].replace("H", "")) : 0;
    let minutes = matches[2] ? parseInt(matches[2].replace("M", "")) : 0;
    let seconds = matches[3] ? parseInt(matches[3].replace("S", "")) : 0;

    let duration = "";
    if (hours > 0) {
      duration += `${hours}:`;
    }
    duration += `${minutes.toString().padStart(2, "0")}:`;
    duration += `${seconds.toString().padStart(2, "0")}`;
    return duration;
  };

  const formatViewCount = (viewCount) => {
    if (viewCount >= 1_000_000_000) {
      return (viewCount / 1_000_000_000).toFixed(1) + "B";
    } else if (viewCount >= 1_000_000) {
      return (viewCount / 1_000_000).toFixed(1) + "M";
    } else if (viewCount >= 1_000) {
      return (viewCount / 1_000).toFixed(1) + "K";
    }
    return viewCount.toString();
  };

  return (
    <div className="container mx-auto p-4">
      {api.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {api.map((videodata, index) => (
            <Link
              to={`https://www.youtube.com/watch?v=${videodata.id}`}
              key={index}
              
            >
              <div className="thumbnail relative">
                <img
                  src={videodata.snippet.thumbnails.medium.url}
                  alt={videodata.snippet.title}
                  className="w-full h-auto"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                  {convertISO8601ToDuration(videodata.contentDetails.duration)}
                </span>
              </div>
              <div className=" mt-2">
                <h4 className=" text-sm font-medium">
                  {videodata.snippet.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {videodata.snippet.channelTitle}
                </p>
                <span className=" flex justify-between text-xs text-gray-500">
                  <p>
                    {formatViewCount(videodata.statistics.viewCount)} views
                  </p>
                  <p>
                    {formatDistanceToNow(
                      new Date(videodata.snippet.publishedAt)
                    )}{" "}
                    ago
                  </p>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}
