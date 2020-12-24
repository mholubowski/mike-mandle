// Import stylesheets
import "./style.css";

import { abs, complex, add, pow } from "mathjs";

// Write TypeScript code!
const pxHeight = 400;
const pxWidth = 400;
const graphHeight = 4;
const graphWidth = 4;
const canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const dot = function(x: number, y: number, c: CanvasRenderingContext2D) {
  c.fillStyle = "black";
  c.fillRect(x, y, 1, 1);
};

const drawGrid = function(c: CanvasRenderingContext2D) {
  c.beginPath();
  c.moveTo(pxWidth / 2, 0);
  c.lineTo(pxWidth / 2, pxHeight);
  ctx.stroke();

  c.beginPath();
  c.moveTo(0, pxHeight / 2);
  c.lineTo(pxWidth, pxHeight / 2);
  c.stroke();
};

// drawGrid(ctx);

const drawBGdots = function() {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      dot(i * 4, j * 4, ctx);
    }
  }
};

//drawBGdots();

///////////////////////////////////////////////////
// Math stuff
//////////////////////////////////////////////////
const iterations = 10;

const mandle = function(z: number, c: number): number {
  return add(pow(z, 2), c);
};

const isFinite = function(z: number): boolean {
  const min = -100;
  const max = 100;
  // return z >= min && z <= max;
  return abs(z) <= 2;
};

const testAPoint = function(c: number): boolean {
  // console.log("STARTING", "C = ", c);
  let z = 0;
  for (var i = 0; i < iterations; i++) {
    //console.log(c, z);
    z = mandle(z, c);
  }
  //console.log(c, z);

  if (isFinite(z)) {
    // console.log(c, "Z IS FINITE. It's in the set");
    return true;
  } else {
    // console.log(c, "Z if infinite :(");
    return false;
  }
};

// For every pixel along the x axis, test the point and color it if it passes.

const testXAxis = function() {
  for (var x = 0; x < pxWidth; x++) {
    for (var y = 0; y < pxHeight; y++) {
      //convert pixel location to C number (0 == -2, 400 == +2)
      const xFactor = graphWidth / pxWidth;
      const xGraph = x * xFactor - graphWidth / 2;

      const yFactor = graphHeight / pxHeight;
      const yGraph = y * yFactor - graphHeight / 2;

      //console.log(i, c);

      const complexNum = complex(xGraph, yGraph);

      const isInSet = testAPoint(complexNum);
      if (isInSet) {
        dot(x, y, ctx);
      }
    }
  }
};

// testXAxis();

console.log("hi");
