import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box, TextField, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CaptionTimeline from "./CaptionTimeline";

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
      setError(""); 
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
      { text: captionText, timestamp: parseFloat(timestamp) },
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
    <>
      <Box
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <Box
          component={Paper}
          elevation={5}
          style={{
            border: "0px solid red",
            marginTop: "20px",
            marginLeft:"25%",
            padding: "15px",
            width: "50%",
            height:"68%"
          }}
        >
          <h2>Video Player with Real-Time Captions</h2>
          <Grid container spacing={2} direction="column">
            {/* Input Field for Video URL */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter video URL"
                value={videoUrl}
                onChange={handleUrlChange}
                style={{
                  fontSize: "16px",
                }}
              />
            </Grid>

            {/* Display error if validation fails */}
            {error && (
              <Grid size={{ xs: 12 }}>
                <Box
                  style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
                >
                  {error}
                </Box>
              </Grid>
            )}

            {/* Input Field for Captions */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter caption"
                value={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
                style={{
                  fontSize: "16px",
                }}
              />
            </Grid>

            {/* Input Field for TimeStamp */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="number"
                placeholder="Enter timestamp (in seconds)"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                style={{
                  fontSize: "16px",
                }}
              />
            </Grid>

            {/* Button for Adding Captions */}
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                onClick={addCaption}
                variant="outlined"
                style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  color: "black", 
                  backgroundColor: "#0071c5",
                }}
              >
                Add Caption
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <CaptionTimeline captionTimeline={captions} />
        </Box>
      </Box>

      <Box>
        {/* Caption visible */}
        {currentCaption && (
          <Box
            style={{
              margin: "0 0 0 23%",
              width: "50%",
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "10px",
              fontSize: "20px",
            }}
          >
            {currentCaption}
          </Box>
        )}

        {/* Video Player */}
        {videoUrl && !error && (
          <Box>
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
                margin:"20px 0 0 28%"
              }}
              onError={() => setError("Failed to load the video.")}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default VideoPlayer;
