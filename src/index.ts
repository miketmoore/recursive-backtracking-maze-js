import { gridFactory, ICell } from './Grid'

class HelloWorld {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  public greet = () => console.log(`Hello, ${this.name}!`)
}

window.onload = () => {
  const c = new HelloWorld('Mike')
  c.greet()
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) {
    throw new Error('Could not find canvas')
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2d context')
  }
  // ctx.fillStyle = '#FF0000'
  // ctx.fillRect(0, 0, 150, 75)

  const size = 50
  const grid = gridFactory(size, 5, 5)

  let x = 0
  let y = 0
  grid.forEachRow((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      console.log(x, y)
      drawRect(ctx, x, y, size, '#999')
      drawCell(ctx, x, y, size, cell)
      x += size
    })
    x = 0
    y += size
  })
}

function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  cell: ICell
) {
  const walls = cell.getWalls()

  ctx.fillStyle = '#000'
  const wallWidth = 5
  if (walls[0]) {
    // north
    ctx.fillRect(x, y, size, wallWidth)
  }
  if (walls[1]) {
    // east
    ctx.fillRect(x + size - wallWidth, y, wallWidth, size)
  }
  if (walls[2]) {
    // south
    ctx.fillRect(x, y + size - wallWidth, size, wallWidth)
  }
  if (walls[3]) {
    // west
    ctx.fillRect(x, y, wallWidth, size)
  }
}
