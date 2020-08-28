import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import {
  pulsar,
  pentaDecathlon,
  oscillators,
  stills,
  glider,
  lwss,
  mwss,
  hwss,
} from "./preloads";
import Rules from "./Explainer";


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
    "#EE7752", "#E73C7E", "#23A6D5", "#23D5AB"
  ];
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};

const App = () => {
  const [numRows, setNumRows] = useState(35);
  const [numCols, setNumCols] = useState(35);

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const changeSpeed = (val) => {
    setSpeed(val);
    return speed;
  };

  const runningRef = useRef(running);
  runningRef.current = running;
  const [generation, setGeneration] = useState(0);
  let gen = 0;

  const runSimulation = useCallback((speed) => {
    let s = speed;

    if (!runningRef.current) {
      gen = 0;
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
    gen++;
    const genUp = () => {
      setGeneration(gen);
    };
    genUp();
    setTimeout(() => {
      runSimulation(speed);
    }, s);
  }, []);
  const insetAutomata = (automata, arr) =>
    arr.map((val, index) =>
      val.map((subVal, subIndex) => {
        if (automata[index] && automata[index][subIndex])
          return automata[index][subIndex];
        return subVal;
      })
    );

  return (
    <>
      <div className="white title centered">Conway's Game of Life</div>
      <div className="generations">
        <div className="white subtitle">generation: {generation}</div><div className="controls">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation(speed);
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
            setGeneration(0);
            gen = 0;
          }}
        >
          clear
        </button>
      </div>
      </div>
      
      <div className="flex-cols">
        <div className="grid">
          {" "}
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
                    if (!running) {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    } else {
                      return;
                    }
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[i][k] ? getRandomColor() : "#242424a4",
                    border: "1px solid grey",
                  }}
                />
              ))
            )}
          </div>
        </div>
        <div className="toggles">
          <button
            onClick={() => {
              if (!running) {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () =>
                      Math.random() > 0.5 ? 1 : 0
                    )
                  );
                }
                setGrid(rows);
              } else {
                return;
              }
            }}
          >
            random
          </button>
          <div className="white center">Oscillators</div>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(pulsar, grid));
              } else {
                return;
              }
            }}
          >
            pulsar
          </button>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(pentaDecathlon, grid));
              } else {
                return;
              }
            }}
          >
            penta decathlon
          </button>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(oscillators, grid));
              } else {
                return;
              }
            }}
          >
            other oscillators
          </button>
          <div className="white center">Stills</div>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(stills, grid));
              } else {
                return;
              }
            }}
          >
            stills
          </button>
          <div className="white center">Gliders</div>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(glider, grid));
              } else {
                return;
              }
            }}
          >
            glider
          </button>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(lwss, grid));
              } else {
                return;
              }
            }}
          >
            lwss
          </button>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(mwss, grid));
              } else {
                return;
              }
            }}
          >
            mwss
          </button>
          <button
            onClick={() => {
              if (!running) {
                setGrid(insetAutomata(hwss, grid));
              } else {
                return;
              }
            }}
          >
            hwss
          </button>
          <div className="white center">Speeds</div>
          <button onClick={() => changeSpeed(25)}>hyper mode</button>
          <button onClick={() => changeSpeed(100)}>fast mode</button>
          <button onClick={() => changeSpeed(500)}>normal mode</button>
          <button onClick={() => changeSpeed(1000)}>slow mode</button>
          <button onClick={() => changeSpeed(5000)}>snail mode</button>
        </div>
        <div className="rules white"><Rules /></div>
      </div>
      
      <div className="about"></div>
    </>
  );
};

export default App;
