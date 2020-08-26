import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import {pulsar, pentaDecathlon, oscillators, stills, glider, lwss, mwss, hwss} from "./preloads"

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const getRandomColor = () => {
  const colorArray = [
    "#FF6633",
    "#FFB399",
    // "#FF33FF",
    // "#FFFF99",
    // "#00B3E6",
    // "#E6B333",
    // "#3366E6",
    // "#999966",
    // "#99FF99",
    // "#B34D4D",
    // "#80B300",
    // "#809900",
    // "#E6B3B3",
    // "#6680B3",
    // "#66991A",
    // "#FF99E6",
    // "#CCFF1A",
    // "#FF1A66",
    // "#E6331A",
    // "#33FFCC",
    // "#66994D",
    // "#B366CC",
    // "#4D8000",
    // "#B33300",
    // "#CC80CC",
    // "#66664D",
    // "#991AFF",
    // "#E666FF",
    // "#4DB3FF",
    // "#1AB399",
    // "#E666B3",
    // "#33991A",
    // "#CC9999",
    // "#B3B31A",
    // "#00E680",
    // "#4D8066",
    // "#809980",
    // "#E6FF80",
    // "#1AFF33",
    // "#999933",
    // "#FF3380",
    // "#CCCC00",
    // "#66E64D",
    // "#4D80CC",
    // "#9900B3",
    // "#E64D66",
    // "#4DB380",
    // "#FF4D4D",
    // "#99E6E6",
    // "#6666FF",
  ];
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 200);
  }, []);
  console.log(grid)
  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button onClick={() => {
        setGrid(pulsar)
      }}>pulsar</button>
      <button onClick={() => {
        setGrid(pentaDecathlon)
      }}>penta decathlon</button>
      <button onClick={() => {
        setGrid(oscillators)
      }}>other oscillators</button>
      <button onClick={() => {
        setGrid(stills)
      }}>stills</button>
      <button onClick={() => {
        setGrid(glider)
      }}>glider</button>
      <button onClick={() => {
        setGrid(lwss)
      }}>lwss</button>
      <button onClick={() => {
        setGrid(mwss)
      }}>mwss</button>
      <button onClick={() => {
        setGrid(hwss)
      }}>hwss</button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'red' : undefined,
                border: '1px solid grey'
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
