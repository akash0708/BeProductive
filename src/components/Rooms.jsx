import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import data from "../../constants/data.json";
import React from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  return (
    <>
      {data ? (
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
            <hr className="w-full" style={{ height: "1em", color: "black" }} />
              {data.map((item, index) => {
                return (
                  <Link
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
              <Input type="name" placeholder="Enter Room Name" />
              <Button asChild>
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
              <Input type="id" placeholder="Enter Room ID" />
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
