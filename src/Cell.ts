import { IWalls, wallsFactory } from './walls'
import { ICoord } from './coord'

export interface ICell {
  readonly getWalls: () => IWalls
  readonly markStart: () => void
  readonly isStart: () => boolean
  readonly markVisited: () => void
  readonly isVisited: () => boolean
  readonly getOppositeWall: (wall: number) => number
  readonly getCoord: () => ICoord
  readonly markPopped: () => void
  readonly isPopped: () => boolean
}

class Cell implements ICell {
  private popped: boolean
  private walls: IWalls = wallsFactory()
  private visited = false
  private start = false
  private coord: ICoord

  constructor(coord: ICoord) {
    this.coord = coord
  }

  public isPopped = () => this.popped
  public markPopped = () => (this.popped = true)
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
  public getCoord = () => this.coord
}

export const cellFactory = (coord: ICoord) => new Cell(coord)
