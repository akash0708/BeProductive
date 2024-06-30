import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [roomName, setroomName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userId = user._id;
    // console.log(user);

    // make request to api/room/create
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
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/allrooms");
      console.log("--------------");
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: error.message,
      //   duration: 5000,
      // });
      console.log(error.message);
      setLoading(false);
    }

    // navigate to /allrooms
  };

  return (
    <div className="flex justify-center items-center">
      <input
        className="border"
        type="text"
        value={roomName}
        onChange={(e) => setroomName(e.target.value)}
      />
      <button onClick={handleSubmit}>create</button>
    </div>
  );
};

export default CreateRoom;
