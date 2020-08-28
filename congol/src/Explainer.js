import React from "react";

const Explainer = () => {
  return (
    <div>
      <h1 className="subtitle white">Rules:</h1>
      <br />
      <ul>
        <li>
          Births: Each dead cell adjacents to exactly three live neighbors will
          become live in the next generation.
        </li>
        <br />
        <li>
          Death by isolation: Each live cell with one or fewer live neighbors
          will die in the next generation.
        </li>
        <br />{" "}
        <li>
          Death by overcrowding: Each live cell with four or more live neighbors
          will die in the next generation.
        </li>
        <br />{" "}
        <li>
          Survival: Each live cell with either two or three live neighbors will
          remain alive for the next generation.
        </li>
      </ul>
    </div>
  );
};

export default Explainer;
