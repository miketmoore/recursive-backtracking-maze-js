import {
  IGrid,
  directions,
  Direction,
  Wall,
  ICoord,
  coordFactory
} from './Grid'

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
  carve(grid, coordFactory(row, col))
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

function carve(grid: IGrid, coord: ICoord) {
  const cell = grid.getCell(coord.row, coord.col)

  // get walls not carved yet, that point to adjacent cells that have not been visited yet
  // const _: Wall[] = Object.keys(cell.getWalls()).map((direction: Direction) => {
  //   const wall = cell.getWalls()[direction]
  //   if (wall.state === 'solid') {
  //     const adjacentCoord = grid.getAdjacentCellCoords(direction, coord)
  //   }
  // })

  // const wall = randInRange(0, 3)
  const direction = randDirection()

  cell.getWalls()[direction].state = 'carved'
  cell.markVisited()
  console.log(cell)

  // is cell that is adjacent to wall that was just carved already visited or not?
  const adjacentCoord = grid.getAdjacentCellCoords(direction, coord)

  if (grid.coordInBounds(adjacentCoord)) {
    const adjacent = grid.getCell(adjacentCoord.row, adjacentCoord.col)
    if (!adjacent.isVisited()) {
      const oppDir = getOppositeDirection(direction)
      adjacent.getWalls()[oppDir].state = 'carved'
      carve(grid, adjacentCoord)
    }
  }
}
