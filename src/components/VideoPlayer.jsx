import React, { useState } from 'react'
import data from '../../constants/data.json'
import { useParams } from 'react-router-dom';



const VideoPlayer = () => {
    const [video, setVideo] = useState(null);
    const [error, setError] = useState('');
    function findValue(arr, key, value) {
        for (let item of arr) {
          if (item[key] === value) {
            return item;
          }
      
          if (item.children) {
            const result = findValue(item.children, key, value);
            if (result) {
              return result;
            }
          }
        }
      
        return null;
      }

      
    const { videoId } = useParams();
    console.log(videoId);
    const currentVideo = findValue(data,"id", videoId)

    // const getCurrent = currentRoom.videos;
    console.log(currentVideo);

  
    return (
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div id="video-container">
          {currentVideo ? (
            <div>
              <iframe
                key={currentVideo.id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={(e) => console.error('Iframe loading error:', e)}
              ></iframe>
              <p>Title: {currentVideo.title}</p>
              <p>Channel: {currentVideo.channel_name}</p>
              <p>Length: {currentVideo.length}</p>
            </div>
          ) : (
            <p>No video to display</p>
          )}
        </div>
      </div>
    );
}

export default VideoPlayer
