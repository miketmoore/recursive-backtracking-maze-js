import { IGrid } from './grid'
import { ICell } from './cell'
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
  carve(carveableGrid, [cell])
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

function carve(carveableGrid: ICarveableGrid, history: ICell[]): void {
  // const cell = carveableGrid.getCell(coord)
  const cell = history[history.length - 1]

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = carveableGrid.getAvailableCellWalls(cell, cell.getCoord())

  // get random wall from results
  if (walls.length === 0) {
    // console.log('backtracking...')
    if (history.length >= 2) {
      const previousCell = history[history.length - 2]
      // console.log(
      //   `backtracking from ${cell
      //     .getCoord()
      //     .toString()} to ${previousCell.getCoord().toString()}`
      // )
      // carve(carveableGrid, null, previousCoord, history.push)
      history.pop()
      carve(carveableGrid, history)
      return
    } else {
      // console.log('cannot backtrack, previous coord is null')
    }
    return
  }

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.state = 'carved'
  cell.markVisited()

  const adjacentCell = carveableGrid.getAdjacentCell(
    wall.direction,
    cell.getCoord()
  )
  if (adjacentCell) {
    if (!adjacentCell.isVisited()) {
      // console.log('adjacent cell has not been visited')
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].state = 'carved'
      adjacentCell.markVisited()
      history.push(adjacentCell)
      carve(carveableGrid, history)
    } else {
      console.log('adjacent cell has been visited')
    }
  } else {
    console.log('no cell')
  }
}
