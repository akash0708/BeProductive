import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { ArrowRight } from "lucide-react";

const AllRooms = () => {
  //check is rooms array > 0, render else navigate to create room
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([
    ...JSON.parse(localStorage.getItem("userInfo")).rooms,
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user.rooms.length == 0) {
      navigate("/createroom");
    }
    // fetch rooms from api
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/room/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRooms();
    console.log(rooms);
  }, []);

  return (
    <>
      <div>
        <h1 className="text-4xl font-semibold">Rooms</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full h-full gap-4">
        {rooms.map((room) => {
          return (
            <Card key={room._id} className="w-1/4">
              <CardHeader>{room.roomName}</CardHeader>
              <CardFooter className="flex justify-between">
                <p>{room.videosId ? room.videosId.length : 0} videos</p>
                <Link to={`/room/${room._id}`}>
                  <ArrowRight />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AllRooms;
