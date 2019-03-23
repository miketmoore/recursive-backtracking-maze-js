import { gridFactory } from './Grid'

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
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(0, 0, 150, 75)

  const grid = gridFactory(20, 5, 5)

  grid.forEachRow((row, col, cell) => {
    console.log(row, col, cell)
  })
}
