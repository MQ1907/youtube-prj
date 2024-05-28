import React, { useEffect, useState } from "react";
import request from "../../../api";
import moment from "moment";
import numeral from "numeral";
const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || id;

  useEffect(() => {
    const getVideoDetail = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetail();
  }, [_videoId]);
  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId]);
  return (
    <div className="mb-4 p-[0.7rem] font-medium text-[0.9rem] cursor-pointer">
      <div className="mb-2 relative">
        <img className="w-[400%] rounded-md" src={medium.url} alt="" />
        <span className="text-xs text-white absolute bottom-[0.3rem] right-[0.3rem] p-[0.2rem] bg-[#080808ec] rounded-[3px]">
          {_duration}
        </span>
      </div>
      <div className="">
        {/* <div className='mt-1 pr-10 col-span-1'>
          <img className='  w-[36px] h-[36px] rounded-[50%] mr-2 cursor-pointer' src={channelIcon?.url} alt=''/>    
        </div> */}
        <div className="items-end justify-end">
          <div className="flex">
            <img
              className="  w-[36px] h-[36px] rounded-[50%] mr-2 cursor-pointer"
              src={channelIcon?.url}
              alt=""
            />
            <div className="mb-[0.1rem] text-[16px] font-semibold text-white line-clamp-2 ml-1">
              {title}
            </div>
          </div>
          <p className="ml-12">{channelTitle}</p>
          <div className="flex items-center ml-12">
            <span>{numeral(views).format("0.a")} Views •</span>
            <span className="ml-1">{moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
