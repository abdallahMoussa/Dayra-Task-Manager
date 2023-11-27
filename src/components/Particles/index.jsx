import React from "react";
import Particles from "particles.js";
import particlesConfig from "../../particles-config.json"; // Adjust the path

const ParticleComponent = () => {
  return (
    <Particles
      params={particlesConfig}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default ParticleComponent;
