import {
  IGrid,
  ICell,
  directions,
  Direction,
  IWalls,
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
  const carveGrid = carveGridFactory(grid)
  carve(carveGrid, coordFactory(row, col))
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

interface ICarveGrid {
  readonly getCell: (row: number, col: number) => ICell
  readonly getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord
  readonly coordInBounds: (coord: ICoord) => boolean
  readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => Wall[]
}

class CarveGrid implements ICarveGrid {
  private grid: IGrid
  constructor(grid: IGrid) {
    this.grid = grid
  }
  public getCell = (row: number, col: number) => this.grid.getCell(row, col)
  public getAdjacentCellCoords = (direction: Direction, coord: ICoord) =>
    this.grid.getAdjacentCellCoords(direction, coord)
  public coordInBounds = (coord: ICoord) => this.grid.coordInBounds(coord)
  public getAvailableCellWalls = (cell: ICell, cellCoord: ICoord) => {
    // available cell walls are walls that have not been carved and that are adjacent to a cell
    // that has not been visited

    const walls = cell.getWalls()
    const results: Wall[] = []
    walls.forEach((direction, wall) => {
      console.log('> ', direction, wall)
      if (wall.state === 'solid') {
        const adjacentCoord = this.grid.getAdjacentCellCoords(
          direction,
          cellCoord
        )
        if (this.grid.coordInBounds(adjacentCoord)) {
          const adjacentCell = this.grid.getCell(
            adjacentCoord.row,
            adjacentCoord.col
          )
          if (!adjacentCell.isVisited()) {
            results.push(wall)
          }
        }
      }
    })

    return results
  }
}

function carveGridFactory(grid: IGrid): ICarveGrid {
  return new CarveGrid(grid)
}

function carve(grid: ICarveGrid, coord: ICoord) {
  const cell = grid.getCell(coord.row, coord.col)

  // get walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = grid.getAvailableCellWalls(cell, coord)
  console.log(walls.length)

  // get random wall from results
  if (walls.length === 0) {
    return
  }
  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.state = 'carved'
  cell.markVisited()

  const adjacentCellCoords = grid.getAdjacentCellCoords(wall.direction, coord)
  if (grid.coordInBounds(adjacentCellCoords)) {
    const adjacentCell = grid.getCell(
      adjacentCellCoords.row,
      adjacentCellCoords.col
    )
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].state = 'carved'
      adjacentCell.markVisited()
      carve(grid, adjacentCellCoords)
      // carve(grid, adjacentCellCoords)
    }
  }

  // // const wall = randInRange(0, 3)
  // const direction = randDirection()

  // const x = cell.getWalls()

  // // cell.getWalls()[direction].state = 'carved'
  // cell.markVisited()
  // console.log(cell)

  // // is cell that is adjacent to wall that was just carved already visited or not?
  // const adjacentCoord = grid.getAdjacentCellCoords(direction, coord)

  // if (grid.coordInBounds(adjacentCoord)) {
  //   const adjacent = grid.getCell(adjacentCoord.row, adjacentCoord.col)
  //   if (!adjacent.isVisited()) {
  //     const oppDir = getOppositeDirection(direction)
  //     adjacent.getWalls()[oppDir].state = 'carved'
  //     carve(grid, adjacentCoord)
  //   }
  // }
}
