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
    wallWidth: number
  } = {
    size: 10,
    rows: 10,
    cols: 10,
    wallWidth: 1
  }

  const newBtn = document.getElementById('new') as HTMLButtonElement

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
    wallWidth
  }: {
    readonly size: number
    readonly rows: number
    readonly cols: number
    readonly wallWidth: number
  }
) {
  const grid = mazeGenerator(
    {
      rows,
      columns: cols
    },
    'iterative'
  )
  canvas.width = cols * size
  canvas.height = rows * size
  const renderer = rendererFactory(canvas, ctx, {
    wallWidth,
    size
  })
  renderer.render(grid)
}
