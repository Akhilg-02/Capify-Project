import { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [captions, setCaptions] = useState([]);
  const [captionText, setCaptionText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const playerRef = useRef(null);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);

    // Validate video URL automatically when entered
    if (!ReactPlayer.canPlay(url)) {
      setError("Invalid video URL. Please provide a valid video URL.");
    } else {
      setError(""); // Clear any previous errors
    }
  };

  const addCaption = () => {
    if (!captionText || !timestamp) {
      alert("Please enter both Caption / Timestamp.");
      return;
    }

    if (parseFloat(timestamp) < 0) {
        alert("Timestamp cannot be negative.");
        return;
      }

    setCaptions((prev) => [
      ...prev,
      { text: captionText, timestamp: parseFloat(timestamp)},
    ]);
    setCaptionText("");
    setTimestamp("");
  };

  const handleProgress = (state) => {
    const currentTime = state.playedSeconds;
    const activeCaption = captions.find(
      (caption) => Math.abs(caption.timestamp - currentTime) < 1
    );

    if (activeCaption) {
      setCurrentCaption(activeCaption.text);
    } else {
      setCurrentCaption("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Video Player</h2>

      {/* Input Field for Video URL */}
      <div>
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={handleUrlChange}
          style={{
            width: "60%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Display error if validation fails */}
      {error && (
        <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {/* Input Field for Captions */}
        <input
          type="text"
          placeholder="Enter caption"
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
          style={{
            width: "45%",
            padding: "10px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        {/* Input Field for TimeStamp */}
        <input
          type="number"
          placeholder="Enter timestamp (in seconds)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          style={{
            width: "45%",
            padding: "10px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addCaption}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Add Caption
        </button>
      </div>

      {/* Video Player */}
      {videoUrl && !error && (
        <div style={{ marginTop: "20px" }}>
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            controls
            width="600px"
            height="360px"
            onProgress={handleProgress}
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "4px",
            }}
            onError={() => setError("Failed to load the video.")}
          />

          {currentCaption && (
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: "0",
                right: "0",
                textAlign: "center",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "5px",
                fontSize: "16px",
              }}
            >
              {currentCaption}
            </div>
          )}
        </div>
      )}

      <ul style={{ marginTop: "20px" }}>
        {captions.map((caption, index) => {
          return (
            <>
              <li key={index}>
                {caption.text} - {caption.timestamp}s
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default VideoPlayer;
