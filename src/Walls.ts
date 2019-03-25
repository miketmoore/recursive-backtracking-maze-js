import { Direction } from './Direction'

type WallState = 'solid' | 'carved'

export class Wall {
  public direction: Direction
  public state: WallState = 'solid'
  constructor(direction: Direction) {
    this.direction = direction
  }
}

const wallFactory = (direction: Direction) => new Wall(direction)

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

export const wallsFactory: () => IWalls = () => new Walls()
