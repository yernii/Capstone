import React from "react";

function RegisterCheck() {
  const minimalBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "300px",
  };

  return (
    <div style={minimalBoxStyle}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Log in First!
      </div>
    </div>
  );
}

export default RegisterCheck;
