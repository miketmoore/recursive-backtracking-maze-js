import { IGrid } from './grid'
import { carveGridFactory, ICarveableGrid } from './carveable-grid'
import { randInRange } from './rand'
import { coordFactory, ICoord } from './coord'
import { Direction } from './direction'

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

function carve(
  grid: ICarveableGrid,
  previousCoord: ICoord | null,
  coord: ICoord
): void {
  const cell = grid.getCell(coord)

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
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

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.state = 'carved'
  cell.markVisited()

  const adjacentCell = grid.getAdjacentCell(wall.direction, coord)
  if (adjacentCell && !adjacentCell.isVisited()) {
    const oppDir = getOppositeDirection(wall.direction)
    adjacentCell.getWalls()[oppDir].state = 'carved'
    adjacentCell.markVisited()
    return carve(grid, coord, adjacentCell.getCoord())
  }
}
