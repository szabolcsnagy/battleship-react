import type { BoardState } from "~/components/GameBoard";


/**
 * Get the index of a cell by column and row
 * @param colIndex The column index (0-9)
 * @param rowIndex The row index (0-9)
 * @returns The index of the cell
 */
export function getCellIndex({colIndex, rowIndex}: {colIndex:number, rowIndex:number}) {
  return colIndex + rowIndex * 10;
}


/**
 * Get the ship that the cell belongs to the `at` coordinates
 * @param board The game board
 * @param at The coordinates of the cell
 * @param ship The ship to which the cell belongs
 * @returns The ship that the cell belongs to
 */
export function getShip(board: BoardState, at:{colIndex:number, rowIndex:number},ship:number[]=[]) {
  const cellIndex = getCellIndex(at);
  const cellValue = board.cells[cellIndex];

  console.log('Ship cell:', ship);
  if (!['ship','hit'].includes(cellValue)) {
    return ship;
  }

  // add the cell to the ship if not already there
  if(!ship.includes(cellIndex)) {
    ship.push(cellIndex);
  }

  // check directions
  const directions = [
    [-1, 0], // left
    [1, 0],  // right
    [0, -1], // up
    [0, 1]   // down
  ];

  for (const [dCol, dRow] of directions) {
    const colIndex = at.colIndex + dCol;
    const rowIndex = at.rowIndex + dRow;
    if (colIndex >= 0 && colIndex < 10 && rowIndex >= 0 && rowIndex < 10) {
      const cellIndex = getCellIndex({colIndex, rowIndex});
      const cellValue = board.cells[cellIndex];
      if (['hit','ship'].includes(cellValue)) {
        if(!ship.includes(cellIndex)) {
          // recursively check the next cell in the same direction
          getShip(board, {colIndex, rowIndex}, ship);
        }
      }
    }
  }

  return ship;
}
  
/**
 * Mark a ship as sunken if all its cells are hit
 * @param board The game board
 * @param at The coordinates of the cell
 * @returns The game board with the ship marked as sunken
 */
export function markSunkenShip(board: BoardState, at:{colIndex:number, rowIndex:number}) {
  const ship = getShip(board, at);
  if (ship.length > 0 && ship.every(index => board.cells[index] === 'hit')) {
    // mark the entire ship as a wreck
    board.cells = board.cells.map((cell, index) => {
      if (ship.includes(index)) {
        return 'wreck';
      }
      return cell;
    });
  } 
  return board;
}

/**
 * Mark a cell as hit or miss
 * @param board The game board
 * @param at The coordinates of the cell
 * @returns The game board with the cell marked as hit or miss
 */
export function markHitOrMiss(board: BoardState, at:{colIndex:number, rowIndex:number}) {
  const cellIndex = getCellIndex(at);
  return {
    cells: board.cells.map((cell, index) => {
      if(index === cellIndex) {
        switch (cell) {
          case 'ship':
            return 'hit';
          case 'water':
            return 'miss';
          default:
            return cell;
        }
      }
      return cell
    })
  };
}