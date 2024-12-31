import { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      if (!vantaEffect) {
        try {
          setVantaEffect(
            BIRDS({
              THREE,
              el: myRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              birdSize: 1.5,
              separation: 59.0,
              alignment: 20.0,
              cohesion: 20.0,
              backgroundColor: 0x7192f,
              color1: 0xff0000,
              color2: 0xd1ff,
              speedLimit: 2.0,
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
      style={{ height: "70vh", width: "100%", position: "relative" }}
    >
      {/* content */}
      <div
        style={{
          width:"97.5%",
          height:"64.5vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: .5,
          color: "#e3e3e3",
          textAlign: "center",
          fontSize: "2em",
          background: "linear-gradient(90deg,rgba(1, 2, 4, 0.67),rgba(42, 82, 152, 0.24))", 
          padding: "20px",
          borderRadius: "12px", 
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>Capify</h1>
        <p>
          <span style={{fontSize:"1em"}}>
            Capify is a dynamic application that provides real-time video captions, enhancing accessibility and user engagement seamlessly.
          </span></p>
      </div>
      
    </div>
  );
};

export default Header;

