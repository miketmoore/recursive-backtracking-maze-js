import { IGrid } from './Grid'
import { ICoord } from './Coord'
import { Direction } from './Direction'
import { ICell } from './Cell'
import { Wall } from './Walls'

export interface ICarveableGrid {
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

export function carveGridFactory(grid: IGrid): ICarveableGrid {
  return new CarveableGrid(grid)
}
