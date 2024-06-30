import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../constants/data.json";
import VideoCard from "./VideoCard";
import { Button } from "./ui/button";
import { ArrowRight, CirclePlus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const Videos = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [userInput, setUserInput] = useState("");
  console.log(roomId);
  // const findRoomById = (id) => {
  //     return data.find(room => room.RoomID === id);
  //   };
  // const currentRoom = findRoomById(roomId);
  // const currentRoomVideos = currentRoom.videos;
  // console.log(currentRoomVideos);

  // make an api call to get the videoid of array of a room
  useEffect(() => {
    // fetch the videos of the room
    const getVideos = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `http://localhost:3000/api/room/getVideo`,
          { roomId },
          config
        );
        console.log(data);
        setRoomName(data.roomName);
        setVideos(data.videosId);
        console.log(videos);
      } catch (error) {
        console.log(error.message);
      }
    };
    getVideos();

    // get video details from the video id by calling api
  }, []);

  useEffect(() => {
    const getVideoDetails = async () => {
      for (let i = 0; i < videos.length; i++) {
        const data = new FormData();
        data.append("videoId", videos[i]);

        const options = {
          method: "POST",
          url: "https://youtube-scraper-2023.p.rapidapi.com/video_details",
          headers: {
            "x-rapidapi-key":
              "eb6f7f36b6msh642ae1bad04a16ep106c6djsndb4a0237bf2f",
            "x-rapidapi-host": "youtube-scraper-2023.p.rapidapi.com",
          },
          data: data,
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);
          setVideoDetails((videoDetails) => [
            ...videoDetails,
            {
              title: response.data.title,
              thumbnail: response.data.thumbnails[0].url,
              id: response.data.id,
            },
          ]);
          console.log(videoDetails);
          console.log("----------------");
        } catch (error) {
          console.error(error);
        }
      }
    };

    getVideoDetails();
  }, [videos]);

  const addVideoId = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = axios.post(
      `http://localhost:3000/api/content/addVideo`,
      { roomId, videoId: userInput },
      config
    );
    console.log(data);
    console.log(videos);
    console.log(videoDetails);
  };

  return (
    <>
      <div className="flex justify-between mr-5 mt-10">
        <h1 className="font-poppins m-3 text-2xl font-extrabold">
          {/* {currentRoom.RorooomName} */}
          {roomName}
        </h1>
        <div className="m-3">
          <Trash2 />
        </div>
      </div>
      <hr />
      <div className="flex flex-row gap-5 m-3 mt-5">
        {/* {currentRoomVideos.map((item)=>{
            return(
                <VideoCard video={item} room={roomId} key={item.id} />
            )
        })} */}
        {videoDetails &&
          videoDetails.map((item) => {
            return (
              <Card key={item.title}>
                <CardHeader>
                  <img src={item.thumbnail} alt="thumb" />
                </CardHeader>
                <CardContent>
                  <p>{item.title}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`video/${item.id}`}>
                    <ArrowRight className="hover:scale-150 duration-300" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        {!videoDetails && <p>No videos found</p>}
        <div className="block">
          <h1>Add video</h1>
          <input
            className="border"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={addVideoId}>Add</button>
        </div>
      </div>
    </>
  );
};

export default Videos;
