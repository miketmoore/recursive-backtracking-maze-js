# Recursive Backtracking Maze - TypeScript

This is a library that renders a maze in the browser (HTML5) canvas. You can generate a new maze by clicking the "New" button. 

```
yarn install
yarn dev
```

Open in http://localhost:9000

![Maze](maze.png)

## Notes

I followed the algorithm outlined here: https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking

> 1. Choose a starting point in the field.
> 2. Randomly choose a wall at that point and carve a passage through to the adjacent cell, but only if the adjacent cell has not been visited yet. This becomes the new current cell.
> 3. If all adjacent cells have been visited, back up to the last cell that has uncarved walls and repeat.
> 4. The algorithm ends when the process has backed all the way up to the starting point.