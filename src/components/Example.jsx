import React from "react";
import { useLocation } from "react-router-dom";

const Example = () => {
  const location = useLocation();
  const { param1, param2 } = location.state;

  return (
    <div>
      <h1>Received Data:</h1>
      <p>Param1: {param1}</p>
      <p>Param2: {param2}</p>
    </div>
  );
};

export default Example;
