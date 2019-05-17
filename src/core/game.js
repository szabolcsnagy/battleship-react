// move these to a lib
export const initBoardState = (
  rows,
  columns,
  cell_gap = 2,
  cell_width = 100,
  cell_height = 100
) => {
  let cell = {
    type: 'water', // ship | wrek | water
    translateX: 0,
    translateY: 0
  }
  const boardState = {
    rows: rows,
    cols: columns,
    cells: []
  }

  for (let i = 0; i < rows * columns; i++) {
    const colNumber = i % columns
    const rowNumber = Math.floor(i / columns)
    // console.log("(i % columns)", i % columns, colNumber, rowNumber);
    boardState.cells.push({
      type: 'water', // water OR ship
      display: 'water', // the cell that is rendered
      modifiers: '', // hit, sunken
      translateX: cell_gap + colNumber * cell_width + colNumber * cell_gap,
      translateY: cell_gap + rowNumber * cell_height + rowNumber * cell_gap,
      colNumber: colNumber,
      rowNumber: rowNumber
    })
  }
  // console.log("init board", board);
  return boardState
}

export function getCellXY(x, y, boardState) {
  const rows = boardState.rows
  const cell = boardState.cells[rows * x + y]
  // console.log(cell)
  return cell
}

export function setCellXYState(x, y, state, boardState) {
  const rows = boardState.rows
  const oldCell = getCellXY(x, y, boardState)
  const beforeCells = boardState.cells.slice(0, rows * x + y)
  const afterCells = boardState.cells.slice(
    rows * x + y + 1,
    boardState.cells.length
  )
  const newCells = [...beforeCells, { ...oldCell, type: state }, ...afterCells]
  // console.log(newCells, newCells.length)
  boardState.cells = newCells
}

function getShipLength(ship) {
  return parseInt(ship.match(/\d/)[0])
}

export function placeShip(x, y, ship, orientation, boardState) {
  // ships are string s1,s2,s3...s4
  const shiplength = getShipLength(ship)
  if (orientation === 'h') {
    for (let i = y; i < y + shiplength; i++) {
      setCellXYState(x, i, 'ship', boardState)
    }
  }

  if (orientation === 'v') {
    for (let i = x; i < x + shiplength; i++) {
      setCellXYState(i, y, 'ship', boardState)
    }
  }
}

export function shipCanBePlaced(x, y, ship, orientation, boardState) {
  const shiplength = getShipLength(ship)
  // not on board
  let result = x >= 0 && x < boardState.rows && y >= 0 && y < boardState.cols
  const checkNorth = (x, y) => {
    return (
      x === 0 || (x > 0 && getCellXY(x - 1, y, boardState).type === 'water')
    )
  }

  const checkEast = (x, y) => {
    return (
      y === boardState.cols - 1 ||
      (y < boardState.cols - 1 &&
        getCellXY(x, y + 1, boardState).type === 'water')
    )
  }

  const checkSouth = (x, y) => {
    return (
      x === boardState.rows - 1 ||
      getCellXY(x + 1, y, boardState).type === 'water'
    )
  }

  const checkWest = (x, y) => {
    return y === 0 || getCellXY(x, y - 1, boardState).type === 'water'
  }

  if (orientation === 'h') {
    // does it fit on the board
    result = result && y + shiplength <= boardState.cols
    // does it touch other ships
    for (let i = y; i < y + shiplength; i++) {
      let north, east, south, west

      // in the first row OR the row above it is water
      north = checkNorth(x, i)
      // last column has no estern neighbour OR the col on the right is water
      east = checkEast(x, i)
      // start at last row OR the cell below it is water
      south = checkSouth(x, i)
      // start at first column OR the cell left of it is water
      west = checkWest(x, i)
      // console.log(result, north, east, south, west, i, 'RNESWi')
      result = result && north && east && south && west
      if (result === false) break
    }
  }

  if (orientation === 'v') {
    // does it fit on the board
    result = result && x + shiplength <= boardState.rows
    // does it touch other ships
    for (let i = x; i < x + shiplength; i++) {
      let north, east, south, west

      // in the first row OR the row above it is water
      north = checkNorth(i, y)
      // last column has no estern neighbour OR the col on the right is water
      east = checkEast(i, y)
      // start at last row OR the cell below it is water
      south = checkSouth(i, y)
      // start at first column OR the cell left of it is water
      west = checkWest(i, y)
      // console.log(result, north, east, south, west, i, 'RNESWi')
      result = result && north && east && south && west
      if (result === false) break
    }
  }
  return result
}

export function placeShipsRandom(ships, boardState) {
  // expect an array of ships ['s1','s2','s3','s4','s5','s4']
  for (let ship in ships) {
    let x = Math.random(boardState.rows)
    let y = Math.random(boardState.cols)
    let orientation = Math.random() < 0.5 ? 'v' : 'h'
    // keep generating new random coordinates until it can be placed
    while (!shipCanBePlaced(x, y, ship, orientation, boardState)) {
      x = Math.random(boardState.rows)
      y = Math.random(boardState.cols)
      orientation = Math.random() < 0.5 ? 'v' : 'h'
    }
    // place the ship
    placeShip(x, y, ship, orientation, boardState)
  }
}

export function hit(x, y, boardState) {
  // change the modifier on the target and start
}

export function destroyed(x, y, boardState) {
  // start a timer and mark the ship at x,y destroyed
  // This is to give some time for the last hit to show.
}

export function isDestroyed(x, y, boardState) {
  return false
}
