import { IGrid, directions, Direction } from './Grid'

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

const randDirection = () => {
  const i = randInRange(0, 3)
  return directions[i]
}

const getOppositeDirection: (direction: Direction) => Direction = direction => {
  if (direction === 'north') {
    return 'south'
  } else if (direction === 'east') {
    return 'west'
  } else if (direction === 'south') {
    return 'north'
  }
  return 'east'
}

function carve(grid: IGrid, row: number, col: number) {
  const cell = grid.getCell(row, col)

  // get walls not carved yet, that point to adjacent cells that have not been visited yet
  // const wallsNotCarved = cell.getWalls().filter(wall => wall == 1)

  // const wall = randInRange(0, 3)
  const direction = randDirection()

  cell.getWalls()[direction].state = 'carved'
  cell.markVisited()
  console.log(cell)

  // is cell that is adjacent to wall that was just carved already visited or not?
  const [adjacentRow, adjacentCol] = grid.getAdjacentCellCoords(
    direction,
    row,
    col
  )

  if (grid.rowInBounds(adjacentRow) && grid.colInBounds(adjacentCol)) {
    const adjacent = grid.getCell(adjacentRow, adjacentCol)
    if (!adjacent.isVisited()) {
      const oppDir = getOppositeDirection(direction)
      adjacent.getWalls()[oppDir].state = 'carved'
      carve(grid, adjacentRow, adjacentCol)
    }
  }
}
