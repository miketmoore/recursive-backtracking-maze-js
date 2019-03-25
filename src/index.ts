import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'
import { ICell } from './cell'

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) {
    throw new Error('Could not find canvas')
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2d context')
  }

  const newBtn = document.getElementById('new') as HTMLButtonElement
  newBtn.onclick = () => run(canvas, ctx)

  run(canvas, ctx)
}

function run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const rows = 30
  const cols = 30
  const size = 10
  const wallWidth = 1
  const grid = gridFactory(rows, cols)

  carveMaze(grid)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let x = 0
  let y = 0
  grid.forEachRow((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      // drawRect(
      //   ctx,
      //   x,
      //   y,
      //   size,
      //   cell.isStart() ? 'blue' : cell.isVisited() ? 'yellow' : '#999'
      // )
      drawCell(ctx, wallWidth, x, y, size, cell)
      // ctx.font = '12px sans-serif'
      // ctx.fillText(`${rowIndex},${colIndex}`, x + 5, y + 15)
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
  wallWidth: number,
  x: number,
  y: number,
  size: number,
  cell: ICell
) {
  const walls = cell.getWalls()

  ctx.fillStyle = '#000'
  if (walls.north.state === 'solid') {
    ctx.fillRect(x, y, size, wallWidth)
  }
  if (walls.east.state === 'solid') {
    ctx.fillRect(x + size - wallWidth, y, wallWidth, size)
  }
  if (walls.south.state === 'solid') {
    ctx.fillRect(x, y + size - wallWidth, size, wallWidth)
  }
  if (walls.west.state === 'solid') {
    ctx.fillRect(x, y, wallWidth, size)
  }
}
