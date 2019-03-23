class Cell {
  private walls = [1, 1, 1, 1]
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

  public forEachRow = (cb: (row: number, col: number, cell: Cell) => void) => {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        cb(rowIndex, colIndex, cell)
      })
    })
  }
}

export const gridFactory = (size: number, rows: number, cols: number) =>
  new Grid(size, rows, cols)
