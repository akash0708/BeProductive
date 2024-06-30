import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
// import data from "../../constants/data.json";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "./ui/use-toast";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [roomId, setRoomId] = useState();
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  useEffect(() => {
    if (user.rooms.length > 0) {
      // navigate("/room");
      // some logic to render the rooms
      console.log(user.rooms.length);
      setData(...user.rooms);
    }
  }, [user]);

  const handleClick = async () => {
    const userId = user._id;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/api/room/create`,
        { userId, roomName },
        config
      );
      toast({
        title: "Account created successfully",
        variant: "default",
        duration: 5000,
      });
      setUser(data);
      console.log(user);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {data.length ? (
        <>
          <div className="text-start ml-2">
            <div className="flex justify-between">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mt-10">
                Rooms
              </h1>
              <div className="mt-12 mr-5">
                <CirclePlus />
              </div>
            </div>
            <div>
              <hr
                className="w-full"
                style={{ height: "1em", color: "black" }}
              />
              {/* {data.map((item, index) => {
                return (
                  <Link
                    key={item.RoomID}
                    to={`/room/${item.RoomID}`}
                    className="border-2 m-2 p-4 rounded-xl inline-block cursor-pointer hover:border-black transition-all"
                  >
                    <h1 className="text-lg font-semibold tracking-tight">
                      {item.RoomName}
                    </h1>
                    <p className="text-sm font-regular tracking-tight">
                      {item.videos.length} videos
                    </p>
                  </Link>
                );
              })} */}
              {user.rooms.map((room) => {
                return <div key={room}>{room}</div>;
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center mx-auto mt-44">
          <div className=" text-center items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Create New Room
            </h3>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-4 mx-auto">
              <Input
                type="name"
                placeholder="Enter Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Button onClick={handleClick}>
                <CirclePlus />
              </Button>
            </div>
          </div>
          <p className="text-center mt-5">or</p>
          <div className="text-center items-center mt-5">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Join a Room
            </h3>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-4 mx-auto">
              <Input
                type="id"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Button type="submit">
                <CirclePlus />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rooms;
