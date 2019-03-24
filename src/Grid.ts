type WallState = 'solid' | 'carved'

export class Wall {
  public direction: Direction
  public state: WallState = 'solid'
  constructor(direction: Direction) {
    this.direction = direction
  }
}

const wallFactory = (direction: Direction) => new Wall(direction)

export const directions: Direction[] = ['north', 'east', 'south', 'west']
export type Direction = 'north' | 'east' | 'south' | 'west'

// type Walls = Record<Direction, Wall>
export interface IWalls {
  readonly north: Wall
  readonly east: Wall
  readonly south: Wall
  readonly west: Wall
  readonly forEach: (cb: (direction: Direction, wall: Wall) => void) => void
}

// const Walls = {
//   north: wallFactory(),
//   east: wallFactory(),
//   south: wallFactory(),
//   west: wallFactory(),
//   forEach: (cb: (direction: Direction, wall: Wall) => void) => {
//     Object.keys(this).forEach((direction: Direction) => {
//       cb(direction, this[direction])
//     })
//   }
// }

class Walls implements IWalls {
  private walls: Record<Direction, Wall> = {
    north: wallFactory('north'),
    east: wallFactory('east'),
    south: wallFactory('south'),
    west: wallFactory('west')
  }
  public forEach = (cb: (direction: Direction, wall: Wall) => void) => {
    Object.keys(this.walls).forEach((direction: Direction) => {
      cb(direction, this.walls[direction])
    })
  }
  public north = this.walls.north
  public east = this.walls.east
  public south = this.walls.south
  public west = this.walls.west
}

const wallsFactory: () => IWalls = () => new Walls()

export interface ICell {
  readonly getWalls: () => IWalls
  readonly markStart: () => void
  readonly isStart: () => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
}
class Cell implements ICell {
  private walls: IWalls = wallsFactory()
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

export interface ICoord {
  readonly row: number
  readonly col: number
}

class Coord implements ICoord {
  public row: number
  public col: number
  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }
}

export const coordFactory: (row: number, col: number) => ICoord = (
  row: number,
  col: number
) => new Coord(row, col)

export interface IGrid {
  readonly forEachRow: (cb: (row: ICell[], rowIndex: number) => void) => void
  readonly getTotalRows: () => number
  readonly getTotalCols: () => number
  readonly getCell: (row: number, col: number) => ICell
  readonly getAdjacentCellCoords: (
    direction: Direction,
    coord: ICoord
  ) => ICoord
  readonly coordInBounds: (coord: ICoord) => boolean
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
}

export const gridFactory: (
  size: number,
  rows: number,
  cols: number
) => IGrid = (size, rows, cols) => new Grid(size, rows, cols)
