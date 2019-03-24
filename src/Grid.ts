type WallState = 'solid' | 'carved'

class Wall {
  public state: WallState = 'solid'
}

const wallFactory = () => new Wall()

export const directions: Direction[] = ['north', 'east', 'south', 'west']
export type Direction = 'north' | 'east' | 'south' | 'west'

type Walls = Record<Direction, Wall>

export interface ICell {
  readonly getWalls: () => Walls
  readonly markStart: () => void
  readonly isStart: () => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
}
class Cell implements ICell {
  private walls: Walls = {
    north: wallFactory(),
    east: wallFactory(),
    south: wallFactory(),
    west: wallFactory()
  }
  private visited = false
  private start = false

  public getWalls = () => this.walls
  public markVisited = () => (this.visited = true)
  public markStart = () => (this.start = true)
  public isStart = () => this.start
  public isVisited = () => this.visited
  public getOppositeWall = (wall: number) => {
    if (wall === 0) {
      return 2
    } else if (wall === 1) {
      return 3
    } else if (wall === 2) {
      return 0
    }
    return 1
  }
}

export interface IGrid {
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getTotalRows: () => number
  readonly getTotalCols: () => number
  readonly getCell: (row: number, col: number) => ICell
  readonly getAdjacentCellCoords: (
    direction: Direction,
    row: number,
    col: number
  ) => [number, number]
  readonly rowInBounds: (row: number) => boolean
  readonly colInBounds: (col: number) => boolean
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

  public getAdjacentCellCoords: (
    direction: Direction,
    row: number,
    col: number
  ) => [number, number] = (direction, row, col) => {
    switch (direction) {
      case 'north':
        return [row - 1, col]
      case 'east':
        return [row, col + 1]
      case 'south':
        return [row + 1, col]
      case 'west':
        return [row, col - 1]
    }
    return [-1, -1]
  }

  public rowInBounds = (row: number) => row >= 0 && row < this.rows
  public colInBounds = (col: number) => col >= 0 && col < this.cols
}

export const gridFactory: (
  size: number,
  rows: number,
  cols: number
) => IGrid = (size, rows, cols) => new Grid(size, rows, cols)
