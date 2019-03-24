export interface ICell {
  readonly getWalls: () => number[]
  readonly markVisited: () => void
  readonly isVisited: () => boolean
}
class Cell implements ICell {
  private walls = [1, 1, 1, 1]
  private visited = false
  public getWalls = () => this.walls
  public markVisited = () => (this.visited = true)
  public isVisited = () => this.visited
}

export interface IGrid {
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getTotalRows: () => number
  readonly getTotalCols: () => number
  readonly getCell: (row: number, col: number) => ICell
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
        this.cells[row][col] = new Cell()
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
  public getCell = (row: number, col: number) => this.cells[row][col]
}

export const gridFactory: (
  size: number,
  rows: number,
  cols: number
) => IGrid = (size, rows, cols) => new Grid(size, rows, cols)
