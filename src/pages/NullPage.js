import React from "react";
import { Link } from "react-router-dom";

const NullPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>
        Seems you are lost, head back to the <Link to="/">home page</Link>
      </h3>
    </div>
  );
};

export default NullPage;
