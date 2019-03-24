import { IGrid } from './Grid'

const randInRange = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function carveMaze(grid: IGrid) {
  const rows = grid.getTotalRows()
  const cols = grid.getTotalCols()
  const row = randInRange(0, rows - 1)
  const col = randInRange(0, cols - 1)
  grid.getCell(row, col).markStart()
  carve(grid, row, col)
}

function carve(grid: IGrid, row: number, col: number) {
  const wall = randInRange(0, 3)
  const cell = grid.getCell(row, col)
  cell.getWalls()[wall] = 0
  cell.markVisited()

  // is cell that is adjacent to wall that was just carved already visited or not?
  const [adjacentRow, adjacentCol] = grid.getAdjacentCellCoords(wall, row, col)

  if (grid.rowInBounds(adjacentRow) && grid.colInBounds(adjacentCol)) {
    const adjacent = grid.getCell(adjacentRow, adjacentCol)
    if (!adjacent.isVisited()) {
      adjacent.getWalls()[cell.getOppositeWall(wall)] = 0
      carve(grid, adjacentRow, adjacentCol)
    }
  }
}
