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

  const state: {
    size: number
    wallWidth: number
    showColor: boolean
  } = {
    size: 10,
    wallWidth: 1,
    showColor: true
  }

  const newBtn = document.getElementById('new') as HTMLButtonElement
  const sizeInput = document.getElementById('size') as HTMLInputElement
  sizeInput.addEventListener(
    'input',
    e => {
      state.size = parseInt((e.target as HTMLInputElement).value)
    },
    false
  )
  const wallWidthInput = document.getElementById(
    'wallWidth'
  ) as HTMLInputElement
  wallWidthInput.addEventListener(
    'input',
    e => {
      state.wallWidth = parseInt((e.target as HTMLInputElement).value)
    },
    false
  )
  const colorInput = document.getElementById('color') as HTMLInputElement
  colorInput.addEventListener(
    'input',
    e => {
      state.showColor = !!(e.target as HTMLInputElement).checked
    },
    false
  )

  newBtn.onclick = () => run(canvas, ctx, state)

  run(canvas, ctx, state)
}

function run(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  {
    size,
    wallWidth,
    showColor
  }: {
    readonly size: number
    readonly wallWidth: number
    readonly showColor: boolean
  }
) {
  console.log(`size=${size} wallWidth=${wallWidth}`)
  const timeout = 1
  const rows = 30
  const cols = 30
  const grid = gridFactory(rows, cols)

  const renderer = rendererFactory(canvas, ctx, {
    wallWidth,
    size,
    showColor
  })
  carveMaze(renderer, timeout, grid)
}
