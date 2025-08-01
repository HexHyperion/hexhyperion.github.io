import React from "react";

export default function Glitch({ children }: { children: React.ReactNode }) {
  const layers = [0, 1, 2, 3];
  return (
    <div className="glitch">
      {layers.map((i) => (
        <div
          className="glitch-layer"
          aria-hidden="true"
          key={i}
          style={{ pointerEvents: "auto" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
