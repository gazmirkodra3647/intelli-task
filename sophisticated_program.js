/*
 * Filename: sophisticated_program.js
 * Description: A sophisticated program that performs advanced mathematical calculations and generates a graphical representation of the results.
 */

// Define variables for canvas size
const canvasWidth = 800;
const canvasHeight = 600;

// Create a canvas element
const canvas = document.createElement("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);

// Get the rendering context
const ctx = canvas.getContext("2d");

// Define variables for the mathematical calculations
const equations = [
  { name: "Quadratic", func: x => x * x },
  { name: "Logarithmic", func: x => Math.log(x) },
  { name: "Sinusoidal", func: x => Math.sin(x) },
];

const startX = -10;
const endX = 10;
const incrementX = 0.1;

const startY = -10;
const endY = 10;
const incrementY = 0.1;

// Function to map a value from one range to another
function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
  return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
}

// Function to draw the axes
function drawAxes() {
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight / 2);
  ctx.lineTo(canvasWidth, canvasHeight / 2);
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Function to plot equations
function plotEquations() {
  for (let eq of equations) {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2 - mapRange(eq.func(startX), startY, endY, 0, canvasHeight));
    
    for (let x = startX; x <= endX; x += incrementX) {
      const y = eq.func(x);
      ctx.lineTo(mapRange(x, startX, endX, 0, canvasWidth), canvasHeight / 2 - mapRange(y, startY, endY, 0, canvasHeight));
    }
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = getRandomColor();
    ctx.stroke();
  }
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Clear the canvas
ctx.clearRect(0, 0, canvasWidth, canvasHeight);

// Draw the axes
drawAxes();

// Plot the equations
plotEquations();