import { rendererFactory } from './renderer'
import { mazeGenerator } from '@miketmoore/maze-generator'

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
    rows: number
    cols: number
    timeout: number
    wallWidth: number
    showColor: boolean
  } = {
    size: 10,
    rows: 10,
    cols: 10,
    timeout: 10,
    wallWidth: 1,
    showColor: true
  }

  const newBtn = document.getElementById('new') as HTMLButtonElement

  const timeoutInput = document.getElementById('timeout') as HTMLInputElement
  timeoutInput.addEventListener(
    'input',
    e => {
      state.timeout = parseInt((e.target as HTMLInputElement).value)
    },
    false
  )

  const rowsInput = document.getElementById('rows') as HTMLInputElement
  rowsInput.addEventListener(
    'input',
    e => {
      state.rows = parseInt((e.target as HTMLInputElement).value)
    },
    false
  )

  const colsInput = document.getElementById('cols') as HTMLInputElement
  colsInput.addEventListener(
    'input',
    e => {
      state.cols = parseInt((e.target as HTMLInputElement).value)
    },
    false
  )

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
    rows,
    cols,
    timeout,
    wallWidth,
    showColor
  }: {
    readonly size: number
    readonly rows: number
    readonly cols: number
    readonly timeout: number
    readonly wallWidth: number
    readonly showColor: boolean
  }
) {
  const grid = mazeGenerator(rows, cols)
  canvas.width = cols * size
  canvas.height = rows * size
  const renderer = rendererFactory(canvas, ctx, {
    wallWidth,
    size,
    showColor
  })
  renderer.render(grid)
}
