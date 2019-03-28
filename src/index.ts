import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'
import { ICell } from './cell'
import { rendererFactory } from './renderer'

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
  const timeout = 1
  const rows = 30
  const cols = 30
  const size = 10
  const wallWidth = 1
  const grid = gridFactory(rows, cols)

  const renderer = rendererFactory(canvas, ctx, {
    wallWidth,
    size
  })
  carveMaze(renderer, timeout, grid)
}
