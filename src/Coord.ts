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
