// filename: awesomeCode.js

/*
This code generates a random maze using Prim's algorithm and solves it using A* search. 
It includes multiple classes and helper functions to handle the maze generation, solving, and rendering.
*/

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.visited = false;
  }
}

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    this.generateGrid();
    this.generateMaze();
  }

  generateGrid() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid.push(new Cell(row, col));
      }
    }
  }

  generateMaze() {
    const stack = [];
    const startCell = this.grid[0];
    startCell.visited = true;
    stack.push(startCell);

    while (stack.length > 0) {
      const currentCell = stack.pop();
      const neighbors = this.getUnvisitedNeighbors(currentCell);

      if (neighbors.length > 0) {
        stack.push(currentCell);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWalls(currentCell, randomNeighbor);
        randomNeighbor.visited = true;
        stack.push(randomNeighbor);
      }
    }
  }

  getUnvisitedNeighbors(cell) {
    const { row, col } = cell;
    const neighbors = [];

    const top = row !== 0 ? this.grid[this.getIndex(row - 1, col)] : undefined;
    const right = col !== this.cols - 1 ? this.grid[this.getIndex(row, col + 1)] : undefined;
    const bottom = row !== this.rows - 1 ? this.grid[this.getIndex(row + 1, col)] : undefined;
    const left = col !== 0 ? this.grid[this.getIndex(row, col - 1)] : undefined;

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    return neighbors;
  }

  getIndex(row, col) {
    return row * this.cols + col;
  }

  removeWalls(cell1, cell2) {
    const rowDiff = cell1.row - cell2.row;
    const colDiff = cell1.col - cell2.col;

    if (rowDiff === 1) { // cell1 is above cell2
      cell1.walls[0] = false;
      cell2.walls[2] = false;
    } else if (rowDiff === -1) { // cell1 is below cell2
      cell1.walls[2] = false;
      cell2.walls[0] = false;
    }

    if (colDiff === 1) { // cell1 is to the left of cell2
      cell1.walls[3] = false;
      cell2.walls[1] = false;
    } else if (colDiff === -1) { // cell1 is to the right of cell2
      cell1.walls[1] = false;
      cell2.walls[3] = false;
    }
  }
}

class MazeSolver {
  constructor(maze) {
    this.maze = maze;
    this.startCell = maze.grid[0];
    this.endCell = maze.grid[maze.grid.length - 1];

    this.solveMaze();
  }

  solveMaze() {
    const openSet = [this.startCell];
    const closedSet = [];

    while (openSet.length > 0) {
      let currentIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }

      const currentCell = openSet[currentIndex];
      if (currentCell === this.endCell) {
        this.reconstructPath(currentCell);
        break;
      }

      openSet.splice(currentIndex, 1);
      closedSet.push(currentCell);

      const neighbors = this.getValidNeighbors(currentCell);

      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor)) continue;

        const gScore = currentCell.g + 1;

        if (!openSet.includes(neighbor)) {
          neighbor.g = gScore;
          neighbor.h = this.heuristic(neighbor);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = currentCell;
          openSet.push(neighbor);
        } else if (gScore < neighbor.g) {
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = currentCell;
        }
      }
    }
  }

  getValidNeighbors(cell) {
    const { row, col } = cell;
    const neighbors = [];
    const grid = this.maze.grid;

    const top = row !== 0 ? grid[this.maze.getIndex(row - 1, col)] : undefined;
    const right = col !== this.maze.cols - 1 ? grid[this.maze.getIndex(row, col + 1)] : undefined;
    const bottom = row !== this.maze.rows - 1 ? grid[this.maze.getIndex(row + 1, col)] : undefined;
    const left = col !== 0 ? grid[this.maze.getIndex(row, col - 1)] : undefined;

    if (top && !cell.walls[0]) neighbors.push(top);
    if (right && !cell.walls[1]) neighbors.push(right);
    if (bottom && !cell.walls[2]) neighbors.push(bottom);
    if (left && !cell.walls[3]) neighbors.push(left);

    return neighbors;
  }

  heuristic(cell) {
    const { row, col } = cell;
    const targetRow = this.maze.rows - 1;
    const targetCol = this.maze.cols - 1;
    return Math.abs(targetRow - row) + Math.abs(targetCol - col);
  }

  reconstructPath(cell) {
    const path = [];
    let currentCell = cell;

    while (currentCell) {
      path.unshift(currentCell);
      currentCell = currentCell.previous;
    }

    this.path = path;
  }
}

// Create a 10x10 maze and solve it
const maze = new Maze(10, 10);
const solver = new MazeSolver(maze);

// Rendering the maze and solved path
function renderMaze(maze) {
  for (const cell of maze.grid) {
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';

    if (cell === solver.startCell) {
      cellEl.classList.add('start');
    } else if (cell === solver.endCell) {
      cellEl.classList.add('end');
    } else if (maze.path.includes(cell)) {
      cellEl.classList.add('path');
    }

    for (let i = 0; i < 4; i++) {
      const wallEl = document.createElement('div');
      wallEl.className = 'wall';

      if (cell.walls[i]) {
        wallEl.style.display = 'block';
      }

      cellEl.appendChild(wallEl);
    }

    document.body.appendChild(cellEl);
  }
}

renderMaze(maze);