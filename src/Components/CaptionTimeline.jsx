import { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Box, Button, Paper} from "@mui/material";

const CaptionTimeline = ({ captionTimeline }) => {
  const [expandedText, setExpandedText] = useState(null);

  const toggleExpand = (index) => {
    setExpandedText(expandedText === index ? null : index);
  };
  return (
    <>
    <Box style={{ padding: "15px", marginTop: "60px" }}>
    {captionTimeline.length > 0 && <h2>Captions</h2>}
      <Timeline>
        {captionTimeline.map((caption, index) =>{ 
          const isExpanded = expandedText === index;
          const displayText = isExpanded
          ?caption.text
          :`${caption.text.substring(0, 50)}${caption.text.length > 50 ? "..." : ""}`;
        return(
          <>  
          <TimelineItem
            key={index}
            position={index % 2 === 0 ? "right" : "left"}
          >
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: "#0071c5",
                  color: "white",
                  padding: "6px",
                  fontSize: "12px",
                }}
              >
                
                <span>{caption.timestamp}s</span>
              </TimelineDot>
              <TimelineConnector
                style={{
                  height: "30px",
                  marginTop: "5px",
                  backgroundColor: "#c4c4c4",
                }}
              />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                style={{
                  width:"55%",
                  padding: "10px 15px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  wordWrap: "break-word",
                  position:"relative"
                }}
              >
                {displayText}
              </Paper>
              <Button
              variant="text"
              onClick={() => toggleExpand(index)}
              style={{ fontSize: "14px", textTransform: "none" }}
              >
                {isExpanded ? "Show Less" : "Read More"}
                
              </Button>
            </TimelineContent>
          </TimelineItem>
          </>
        )})}
      </Timeline>
    </Box>
      
    </>
  );
};

export default CaptionTimeline;


