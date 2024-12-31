import { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
window.THREE = THREE;

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

 // console.log("Three.js Version: ", window.THREE?.REVISION); // Should log 121
  useEffect(() => {
    if (!vantaEffect) {
      if (!vantaEffect) {
        try {
          setVantaEffect(
            BIRDS({
              THREE, // Pass the correct THREE context
              el: myRef.current, // Reference to the div for applying the effect
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              birdSize: 1.5,
              separation: 59.0,
              alignment: 20.0, // Change alignment intensity
              cohesion: 20.0, // Control how birds group together
              backgroundColor: 0x7192f, // Dark gray background
              color1: 0xff0000, // Primary bird color (red)
              color2: 0xd1ff, // Secondary bird color (blue)
              speedLimit: 4.0, // Speed of bird movements
            })
          );
        } catch (error) {
          console.error("[VANTA] Init error", error);
        }
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Clean up on unmount
    };
  }, [vantaEffect]);
  return (
    <div
      ref={myRef}
      style={{ height: "50vh", width: "100%", position: "relative" }}
    >
      {/* Foreground content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1>Foreground Content</h1>
        <p>This content appears above the background animation.</p>
      </div>
    </div>
  );
};

export default Header;
