import React, { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import ReactPlayer from "react-player";
import { Card } from "./ui/card";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import './VideoPlayer.css';

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [qnaData, setQnaData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = new FormData();
      data.append("videoId", "RgKAFK5djSk");

      const options = {
        method: "POST",
        url: "https://youtube-scraper-2023.p.rapidapi.com/video_details",
        headers: {
          'x-rapidapi-key': 'eb6f7f36b6msh642ae1bad04a16ep106c6djsndb4a0237bf2f',
    'x-rapidapi-host': 'youtube-scraper-2023.p.rapidapi.com'
        },
        data: data,
      };

      try {
        const response = await axios.request(options);
        console.log("API response:", response.data);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(error.message);
      }
    };

    const summerizerData = () => {
      setLoading(true);
      setVideoId("");
      console.log("Clicked");
      // Call the API to summarize the video
      const url = `http://127.0.0.1:5000/summarize/RgKAFK5djSk`;

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
    };

    const qnaData = () => {
      setLoading(true);
      console.log("Clicked");
      // Call the API to summarize the video
      const url = `http://127.0.0.1:5001/gen_mcq/RgKAFK5djSk`;

      // Making the GET request
      axios
        .get(url)
        .then((response) => {
          // Handle the response data
          console.log(response.data);
          setQnaData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors
          setLoading(false);
          console.error("Error making the request:", error);
        });
      console.log("req complete");
    };

    fetchVideoData();
    summerizerData();
    qnaData();
  }, []);

  return (
    <div className="video-player-container flex flex-col ">
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : videoData ? (
        <>
          <div className="flex">
            <div className="flex w-3/5 flex-col">
              <div className="text-start ">
                <div className="border-4 w-fit rounded-xl items-center text-center flex ">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=RgKAFK5djSk`}
                    controls={true}
                  />
                </div>
                <h2 className="font-poppins text-lg font-semibold">
                  {videoData.title}
                </h2>
              </div>
            </div>
            <div className="flex w-2/5 flex-col">
              <div className="font-bold font-popins text-center">
                Summarize Videos on the Go
                {/* {summary && (
                  <Card className="max-h-96 overflow-y-scroll p-4 font-medium">
                    <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                      {summary}
                    </ReactMarkdown>
                  </Card>
                )}
                {loading && <p>Loading...</p>} */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        {qnaData && qnaData.map((data) => {
          const opt = data.ans;
          return (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{data.q}</AccordionTrigger>
                <AccordionContent>
                  Ans. {data.opt.ans}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default VideoPlayer;
