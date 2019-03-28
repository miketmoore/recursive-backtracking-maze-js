import { IGrid } from './grid'
import { ICell } from './cell'
import { carveGridFactory, ICarveableGrid } from './carveable-grid'
import { randInRange } from './rand'
import { coordFactory, ICoord } from './coord'
import { Direction } from './direction'
import { IRenderer } from './renderer'

const randCoord = (rows: number, cols: number) =>
  coordFactory(randInRange(0, rows - 1), randInRange(0, cols - 1))

export function carveMaze(renderer: IRenderer, timeout: number, grid: IGrid) {
  const cell = grid.getRandCell()
  cell.markStart()
  const carveableGrid = carveGridFactory(grid)
  carve(renderer, timeout, carveableGrid, [cell])
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
  renderer: IRenderer,
  timeout: number,
  carveableGrid: ICarveableGrid,
  history: ICell[]
): void {
  const cell = history[history.length - 1]

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = carveableGrid.getAvailableCellWalls(cell, cell.getCoord())

  // get random wall from results
  if (walls.length === 0) {
    if (history.length >= 2) {
      const backtrackedCell = history.pop()
      if (backtrackedCell) {
        backtrackedCell.markPopped()
      }
      carve(renderer, timeout, carveableGrid, history)
      return
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
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].state = 'carved'
      adjacentCell.markVisited()
      history.push(adjacentCell)

      setTimeout(() => {
        renderer.render(carveableGrid)
        carve(renderer, timeout, carveableGrid, history)
      }, timeout)
    }
  }
}
