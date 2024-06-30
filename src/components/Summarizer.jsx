import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Card } from "./ui/card";

const Summarizer = () => {
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  function getYouTubeVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  }

  // Example usage
  // const url = 'https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU';
  // const videoId = getYouTubeVideoId(url);
  // console.log(videoId);  // Output: zb3Qk8SG5Ms
  function handleClick() {
    setLoading(true);
    setVideoId("");
    console.log("Clicked");
    // Call the API to summarize the video
    const url = `http://127.0.0.1:5002/summarize/${getYouTubeVideoId(videoId)}`;

    // Making the GET request
    axios
      .get(url)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setSummary(response.data.summary);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        setLoading(false);
        console.error("Error making the request:", error);
      });
    console.log("req complete");
  }

  return (
    <div className="w-full h-full font-poppins p-16 flex flex-col gap-10 justify-center items-center">
      <h1 className="relative font-bold text-5xl -top-16">
        Summarize Videos on the Go
      </h1>
      <div className="flex w-3/4 items-center space-x-2">
        <Input
          onChange={(e) => setVideoId(e.target.value)}
          value={videoId}
          type="text"
          placeholder="Enter video id"
        />
        <Button onClick={handleClick}>
          <SendHorizonal />
        </Button>
      </div>
      {summary && (
        <Card className="max-h-64 overflow-y-scroll p-4">
          <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </Card>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Summarizer;
