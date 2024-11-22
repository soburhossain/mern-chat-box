import React from "react";

export default function BackGroundImage() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed animate-background"
      style={{
        backgroundImage:
          "url('https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_a_ufo_main_final.jpg')",
        backgroundPosition: "center",
      }}
    ></div>
  );
}
