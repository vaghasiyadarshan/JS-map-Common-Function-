import React from "react";

export default function Disabled({ disabled, children }) {
  if (disabled) {
    return (
      <div style={{ opacity: 0.8, pointerEvents: "none" }} disabled>
        {children}
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
