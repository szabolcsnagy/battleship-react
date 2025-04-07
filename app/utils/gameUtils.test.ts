import { describe, test, expect } from "vitest";
import { getShip } from "./gameUtils";
import type { BoardState } from "~/components/GameBoard";

describe('getShip', () => {
  test('should return an empty array if the cell is not a ship', () => {
    const board: BoardState = {
      cells: Array.from({ length: 100 }).map(() => 'water')
    };
    const at = { colIndex: 0, rowIndex: 0 };
    expect(getShip(board, at)).toEqual([]);
  });

  test.only('should return an array of cells that form a ship', () => {
    const board: BoardState = {
      cells: Array.from({ length: 100 }).map(() => 'water')
    };
    const at = { rowIndex: 0, colIndex: 0 };
    board.cells[0] = 'ship';
    board.cells[1] = 'hit';
    expect(getShip(board, at)).toEqual([0, 1]);
  });
  
  test.only('should return the single square ship', () => {
    const board: BoardState = {
      cells: Array.from({ length: 100 }).map(() => 'water')
    };
    const at = { rowIndex: 2, colIndex: 1 };
    board.cells[21] = 'ship';
    expect(getShip(board, at)).toEqual([21]);
  });
})