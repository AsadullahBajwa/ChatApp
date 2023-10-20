import React from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

// import React from 'react'

const TestSocket = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  return (
    <div>
      test coomponent
      {/* <Link
        to={{
          pathname: "/example",
          state: {
            param1: decodedToken.username,
            param2: decodedToken.id,
          },
        }}
      >
        Go to Example Component
      </Link>{" "} */}
    </div>
  );
};

export default TestSocket;
