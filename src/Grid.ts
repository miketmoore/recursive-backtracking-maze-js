export interface ICell {
  readonly getWalls: () => number[]
}
class Cell implements ICell {
  private walls = [1, 1, 1, 1]
  public getWalls = () => this.walls
}

class Grid {
  private size: number
  private rows: number
  private cols: number
  private cells: Cell[][]
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

  public forEachRow = (cb: (row: Cell[], rowIndex: number) => void) => {
    this.cells.forEach((row, rowIndex) => {
      cb(row, rowIndex)
    })
  }
}

export const gridFactory = (size: number, rows: number, cols: number) =>
  new Grid(size, rows, cols)
