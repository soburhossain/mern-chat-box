import React from "react";

export default function BackGroundImage() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed animate-background"
      style={{
        backgroundImage:
          "url('https://cdni.rbth.com/rbthmedia/images/2018/12/10/1400x1050_6a3c256cf1c27ac9c7f8491a5f87a0d9.jpg')",
        backgroundPosition: "center",
      }}
    ></div>
  );
}
