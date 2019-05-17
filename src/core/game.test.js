import {
  initBoardState,
  getCellXY,
  setCellXYState,
  placeShip,
  shipCanBePlaced
} from './game.js'

describe('Game init', () => {
  it(' + should create an array ROWSxCOLS', () => {
    const board = initBoardState(5, 5)
    expect(board.cells.length).toBe(25)
  })

  it(' + should retrive cells by XY coordinates', () => {
    const board = initBoardState(3, 3)
    board.cells[3].type = 'test'
    const actual = getCellXY(1, 0, board)
    expect(actual.type).toBe('test')
    expect(actual.rowNumber).toBe(1)
  })

  it(' + should set cell type by coordinates', () => {
    const board = initBoardState(3, 3)
    setCellXYState(1, 0, 'aaa', board)
    const actual = getCellXY(1, 0, board)
    expect(actual.type).toBe('aaa')
    expect(board.cells.length).toBe(9)
  })
})

describe('Ship placement on the board', () => {
  it(' + place size 1 ship vertical', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 1, 's1', 'v', board)
    expect(getCellXY(0, 0, board).type).toBe('water')
    expect(getCellXY(0, 1, board).type).toBe('ship')
    expect(getCellXY(0, 2, board).type).toBe('water')
    expect(getCellXY(1, 1, board).type).toBe('water')
  })

  it(' + place size 2 ship vertical', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 1, 's2', 'v', board)
    expect(getCellXY(0, 0, board).type).toBe('water')
    expect(getCellXY(0, 1, board).type).toBe('ship')
    expect(getCellXY(0, 2, board).type).toBe('water')
    expect(getCellXY(1, 1, board).type).toBe('ship')
  })

  it(' + place size 2 ship horizontal', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 1, 's2', 'h', board)
    expect(getCellXY(0, 0, board).type).toBe('water')
    expect(getCellXY(0, 1, board).type).toBe('ship')
    expect(getCellXY(0, 2, board).type).toBe('ship')
    expect(getCellXY(1, 1, board).type).toBe('water')
  })

  it(' + place size 3 ship vertical', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 0, 's3', 'v', board)
    expect(getCellXY(0, 0, board).type).toBe('ship')
    expect(getCellXY(1, 0, board).type).toBe('ship')
    expect(getCellXY(2, 0, board).type).toBe('ship')
    expect(getCellXY(0, 1, board).type).toBe('water')
    expect(getCellXY(1, 1, board).type).toBe('water')
    expect(getCellXY(2, 1, board).type).toBe('water')
  })

  it(' + place size 3 ship horizontal', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 0, 's3', 'h', board)
    expect(getCellXY(0, 0, board).type).toBe('water')
    expect(getCellXY(1, 1, board).type).toBe('ship')
    expect(getCellXY(1, 1, board).type).toBe('ship')
    expect(getCellXY(1, 2, board).type).toBe('ship')
  })

  it(' + shouldnt let the ship be placed if it doesnt fit on the board horizontal direction', () => {
    const board = initBoardState(3, 3)
    const actual = shipCanBePlaced(1, 1, 's3', 'h', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ship be placed if it doesnt fit on the board vertical direction', () => {
    const board = initBoardState(3, 3)
    const actual = shipCanBePlaced(1, 1, 's3', 'v', board)
    expect(actual).toBe(false)
  })

  it(' + should let the ship be placed if it fits on the board horizontal direction', () => {
    const board = initBoardState(3, 3)
    console.log('This should work')
    const actual = shipCanBePlaced(0, 0, 's3', 'h', board)
    expect(actual).toBe(true)
  })

  it(' + should let the ship be placed if it fits on the board vertical direction', () => {
    const board = initBoardState(3, 3)

    const actual = shipCanBePlaced(0, 1, 's3', 'v', board)
    expect(actual).toBe(true)
  })

  it(' + shouldnt let the ships touch each other (horizontal)', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 2, 's1', 'v', board)
    const actual = shipCanBePlaced(2, 0, 's3', 'h', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ships touch each other (horizontal) 2', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 0, 's1', 'v', board)
    const actual = shipCanBePlaced(0, 0, 's3', 'h', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ships touch each other (horizontal) 3', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 0, 's1', 'v', board)
    const actual = shipCanBePlaced(1, 0, 's3', 'h', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ships touch each other (vertical)', () => {
    const board = initBoardState(3, 3)
    placeShip(0, 0, 's1', 'v', board)
    const actual = shipCanBePlaced(0, 1, 's3', 'v', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ships touch each other (vertical) 2', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 1, 's1', 'v', board)
    const actual = shipCanBePlaced(0, 2, 's3', 'v', board)
    expect(actual).toBe(false)
  })

  it(' + shouldnt let the ships touch each other (vertical) 3', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 1, 's1', 'v', board)
    const actual = shipCanBePlaced(0, 0, 's3', 'v', board)
    expect(actual).toBe(false)
  })

  it(' + ships can touch by corners', () => {
    const board = initBoardState(3, 3)
    placeShip(1, 1, 's1', 'v', board)
    const actual = shipCanBePlaced(0, 0, 's1', 'v', board)
    expect(actual).toBe(true)
  })
})
