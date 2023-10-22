/*
Filename: complex_code.js
Content: A complex JavaScript code example that demonstrates various advanced concepts and techniques.

This code generates a pseudo-random maze using the Prim's algorithm and solves it using the A* search algorithm. It visualizes the maze using HTML canvas, and allows the user to interact with the maze by finding a path from the start to the goal.

For brevity, the code has been condensed and might not be optimal or error-handling is not implemented. */

// Define the maze dimensions
const width = 50;
const height = 30;

// Define the cell size for visualization
const cellSize = 20;

// Create the canvas and context for visualization
const canvas = document.createElement('canvas');
canvas.width = width * cellSize;
canvas.height = height * cellSize;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Define the maze cells and walls
const cells = Array.from({ length: width * height }, () => ({ visited: false, walls: [true, true, true, true] }));

// Define the starting and goal positions
const start = { x: 0, y: 0 };
const goal = { x: width - 1, y: height - 1 };

// Generate the maze using Prim's algorithm
const stack = [{ x: start.x, y: start.y }];
while (stack.length > 0) {
  const current = stack.pop();
  const { x, y } = current;
  const index = y * width + x;
  if (cells[index].visited) continue;
  cells[index].visited = true;

  const neighbors = [
    { x: x - 2, y },
    { x, y: y - 2 },
    { x: x + 2, y },
    { x, y: y + 2 },
  ];
  neighbors.forEach((neighbor) => {
    const { x: nx, y: ny } = neighbor;
    if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
      const nIndex = ny * width + nx;
      if (!cells[nIndex].visited) {
        cells[nIndex].visited = true;
        cells[nIndex].walls = cells[index].walls.map((wall, i) => {
          const dx = (i === 0) - (i === 2);
          const dy = (i === 1) - (i === 3);
          if (x + dx === nx && y + dy === ny) return false;
          return wall;
        });
        stack.push({ x: nx, y: ny });
      }
    }
  });
}

// Define the heuristic function for A* search
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Solve the maze using A* search
const openSet = [start];
const closedSet = [];
const cameFrom = Array.from({ length: width * height }, () => null);
const gScore = Array.from({ length: width * height }, () => Infinity);
const fScore = Array.from({ length: width * height }, () => Infinity);
gScore[start.y * width + start.x] = 0;
fScore[start.y * width + start.x] = heuristic(start, goal);
while (openSet.length > 0) {
  openSet.sort((a, b) => fScore[a.y * width + a.x] - fScore[b.y * width + b.x]);
  const current = openSet.shift();
  if (current.x === goal.x && current.y === goal.y) {
    // Reconstruct the path
    const path = [current];
    while (cameFrom[current.y * width + current.x]) {
      current = cameFrom[current.y * width + current.x];
      path.push(current);
    }
    path.reverse();
    break;
  }

  const { x, y } = current;
  closedSet.push(current);

  const neighbors = [
    { x: x - 1, y },
    { x, y: y - 1 },
    { x: x + 1, y },
    { x, y: y + 1 },
  ];
  neighbors.forEach((neighbor) => {
    const { x: nx, y: ny } = neighbor;
    if (nx >= 0 && ny >= 0 && nx < width && ny < height && !cells[ny * width + nx].walls.some((wall, i) => wall && (x + nx) === 1 && (y + ny) === 1)) {
      const tentativeGScore = gScore[y * width + x] + 1;
      if (tentativeGScore < gScore[ny * width + nx]) {
        cameFrom[ny * width + nx] = current;
        gScore[ny * width + nx] = tentativeGScore;
        fScore[ny * width + nx] = gScore[ny * width + nx] + heuristic({ x: nx, y: ny }, goal);
        if (!openSet.some((node) => node.x === nx && node.y === ny)) {
          openSet.push({ x: nx, y: ny });
        }
      }
    }
  });
}

// Visualize the maze
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'black';
cells.forEach((cell, index) => {
  const x = index % width;
  const y = Math.floor(index / width);
  if (x === 1 && y === 0) {
    ctx.fillStyle = 'green'; // Start position
  } else if (x === width - 1 && y === height - 2) {
    ctx.fillStyle = 'red'; // Goal position
  } else if (path && path.some((node) => node.x === x && node.y === y)) {
    ctx.fillStyle = 'blue'; // Path
  } else if (cell.walls.some((wall) => wall)) {
    ctx.fillStyle = 'black'; // Walls
  } else {
    ctx.fillStyle = 'white'; // Open cells
  }
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
});
