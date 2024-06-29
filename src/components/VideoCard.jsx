import React from 'react'
import { Link } from 'react-router-dom';

const VideoCard = ({ video, room }) => {
    console.log(video);
  return (
    <Link to={`/video/${video.id}`}>
    <div className='w-1/3 rounded-2xl'>
      <img src={video.thumbnail} alt="" />
      <h1 className='font-poppins text-lg font-regular'>{video.title}</h1>
      <p>{video.duration}</p>
    </div>
    </Link>
  )
}

export default VideoCard
