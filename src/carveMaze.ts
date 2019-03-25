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

const randCoord = (rows: number, cols: number) =>
  coordFactory(randInRange(0, rows - 1), randInRange(0, cols - 1))

export function carveMaze(grid: IGrid) {
  const cell = grid.getRandCell()
  cell.markStart()
  const carveableGrid = carveGridFactory(grid)
  carve(carveableGrid, null, cell.getCoord())
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

interface ICarveableGrid {
  readonly getCell: (coord: ICoord) => ICell
  readonly getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord
  readonly coordInBounds: (coord: ICoord) => boolean
  readonly getAvailableCellWalls: (cell: ICell, cellCoord: ICoord) => Wall[]
}

class CarveableGrid implements ICarveableGrid {
  private grid: IGrid
  constructor(grid: IGrid) {
    this.grid = grid
  }
  public getCell = (coord: ICoord) => this.grid.getCell(coord)
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
          const adjacentCell = this.grid.getCell(adjacentCoord)
          if (!adjacentCell.isVisited()) {
            results.push(wall)
          }
        }
      }
    })

    return results
  }
}

function carveGridFactory(grid: IGrid): ICarveableGrid {
  return new CarveableGrid(grid)
}

function carve(
  grid: ICarveableGrid,
  previousCoord: ICoord | null,
  coord: ICoord
): void {
  const cell = grid.getCell(coord)

  // get walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = grid.getAvailableCellWalls(cell, coord)
  console.log(walls.length)

  // get random wall from results
  if (walls.length === 0) {
    // TODO backtrack
    console.log('backtrack 0')
    if (previousCoord) {
      console.log('backtrack 1')
      carve(grid, null, previousCoord)
    }
    return
  }

  // TODO try all available walls

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.state = 'carved'
  cell.markVisited()

  const adjacentCellCoords = grid.getAdjacentCellCoords(wall.direction, coord)
  if (grid.coordInBounds(adjacentCellCoords)) {
    const adjacentCell = grid.getCell(adjacentCellCoords)
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].state = 'carved'
      adjacentCell.markVisited()
      return carve(grid, coord, adjacentCellCoords)
    }
  }
}
