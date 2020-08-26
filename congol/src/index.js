import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// import React, { useState, useRef, useCallback } from "react";
// import produce from "immer";

// const numRows = 50;
// const numCols = 50;

// const operations = [
//   [0, 1],
//   [0, -1],
//   [1, 1],
//   [-1, 1],
//   [1, -1],
//   [-1, -1],
//   [1, 0],
//   [-1, 0],
// ];

// const App = () => {
//   const [grid, setGrid] = useState(() => {
//     const rows = [];
//     for (let i = 0; i < numRows; i++) {
//       rows.push(Array.from(Array(numCols), () => 0));
//     }
//     return rows;
//   });

//   const [running, setRunning] = useState(false);

//   const runningRef = useRef(running);
//   runningRef.current = running;
//   const runSimulation = useCallback(() => {
//     if (!runningRef.current) {
//       return;
//     }
//     //simulate
//     setGrid((g) => {
//       for (let i = 0; i < numRows; i++) {
//         for (let k = 0; k < numCols; k++) {
//           let neighbors = 0;
//           operations.forEach(([x, y]) => {
//             const newI = i + x;
//             const newK = k + y;
//             if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
//               neighbors += g[newI][newK];
//             }
//           });

//           if (neighbors < 2 || neighbors > 3) {
//             gridCopy[i][k] = 0;
//           } else if (g[i][k] === 0 && neighbors === 3) {
//             gridCopy[i][k] = 1;
//           }
//         }
//       }
//     });

//     setTimeout(runSimulation, 1000);
//   }, []);
//   // console.log(grid)

//   return (
//     <>
//       <button
//         onClick={() => {
//           setRunning(!running);
//           runningRef.current = true;
//           runSimulation();
//         }}
//       >
//         {running ? "stop" : "start"}
//       </button>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: `repeat(${numCols}, 20px)`,
//         }}
//       >
//         {grid.map((rows, i) =>
//           rows.map((col, k) => (
//             <div
//               key={`${i}-${k}`}
//               onClick={() => {
//                 const newGrid = produce((grid, gridCopy) => {

//                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
//                 });
//                 setGrid(newGrid);
//               }}
//               style={{
//                 width: 20,
//                 height: 20,
//                 backgroundColor: grid[i][k] ? "blue" : undefined,
//                 border: "solid 1px black",
//               }}
//             />
//           ))
//         )}
//       </div>
//     </>
//   );
// }

// export default App;