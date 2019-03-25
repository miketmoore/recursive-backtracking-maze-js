import { ICoord, coordFactory } from './coord'
import { ICell, cellFactory } from './cell'
import { Direction } from './direction'
import { randInRange } from './rand'

export interface IGrid {
  readonly getRandCoord: () => ICoord
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getTotalRows: () => number
  readonly getTotalCols: () => number
  readonly getCell: (coord: ICoord) => ICell
  readonly getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord
  readonly coordInBounds: (coord: ICoord) => boolean
  readonly getRandCell: () => ICell
}

class Grid implements IGrid {
  private size: number
  private rows: number
  private cols: number
  private cells: ICell[][]
  constructor(size: number, rows: number, cols: number) {
    this.size = size
    this.rows = rows
    this.cols = cols
    this.cells = []
    for (let row = 0; row < rows; row++) {
      this.cells[row] = []
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = cellFactory(coordFactory(row, col))
      }
    }
  }

  public forEachRow = (cb: (row: ICell[], rowIndex: number) => void) => {
    this.cells.forEach((row, rowIndex) => {
      cb(row, rowIndex)
    })
  }

  public getTotalRows = () => this.rows
  public getTotalCols = () => this.cols
  public getCell = (coord: ICoord) => this.cells[coord.row][coord.col]

  public getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord = (direction, coord) => {
    switch (direction) {
      case 'north':
        return coordFactory(coord.row - 1, coord.col)
      case 'east':
        return coordFactory(coord.row, coord.col + 1)
      case 'south':
        return coordFactory(coord.row + 1, coord.col)
      case 'west':
        return coordFactory(coord.row, coord.col - 1)
    }
    return coordFactory(-1, -1)
  }

  private rowInBounds = (row: number) => row >= 0 && row < this.rows
  private colInBounds = (col: number) => col >= 0 && col < this.cols
  public coordInBounds = (coord: ICoord) => {
    return this.rowInBounds(coord.row) && this.colInBounds(coord.col)
  }

  public getRandCoord = () =>
    coordFactory(randInRange(0, this.rows - 1), randInRange(0, this.cols - 1))

  public getRandCell = () => {
    const coord = this.getRandCoord()
    return this.cells[coord.row][coord.col]
  }
}

export const gridFactory: (
  size: number,
  rows: number,
  cols: number
) => IGrid = (size, rows, cols) => new Grid(size, rows, cols)
