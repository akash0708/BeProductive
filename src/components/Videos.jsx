import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../../constants/data.json';
import VideoCard from './VideoCard';
import { Button } from './ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Videos = () => {
const { roomId } = useParams();
const findRoomById = (id) => {
    return data.find(room => room.RoomID === id);
  };
const currentRoom = findRoomById(roomId);
const currentRoomVideos = currentRoom.videos;
console.log(currentRoomVideos);
  return (
    <>
    <div className='flex justify-between mr-5 mt-10'>
        <h1 className='font-poppins m-3 text-2xl font-extrabold'>{currentRoom.RoomName}</h1>
        <div className='m-3'>
            <Trash2 />
        </div>
    </div>
    <hr/>
    <div className='flex flex-row gap-5 m-3 mt-5'>
        {currentRoomVideos.map((item)=>{
            return(
                <VideoCard video={item} room={roomId} key={item.id} />
            )
        })}
    </div>
    </>
  )
}

export default Videos
