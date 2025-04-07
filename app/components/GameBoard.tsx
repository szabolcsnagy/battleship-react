import React from "react";
import { getCellIndex, markHitOrMiss, markSunkenShip } from "~/utils/gameUtils";

type CellState = 'water' | 'ship' | 'wreck' | 'miss' | 'hit';

export type BoardState = {
  cells: CellState[]
}

export type GameMode = 'place' | 'attack'

/**
 * Render a game board
 * @param param0 
 * @returns 
 */
function GameBoard({mode, hideShips}: {mode: GameMode, hideShips: boolean}) {
  
  const [board, setBoard] = React.useState<BoardState>({
    cells: Array.from({length:100}).map(_=>'water')
  });

  const columnLabels=['','A','B','C','D','E','F','G','H','I','J'];
  
  function handleCellClick(e: React.MouseEvent<HTMLButtonElement>) {
    const cellCoordinates = e.currentTarget.getAttribute('data-cell-index');
    if(!cellCoordinates) return;
    const [colNumber, rowNumber] = cellCoordinates.split(',').map(Number);
    const cellIndex = getCellIndex({colIndex: colNumber, rowIndex: rowNumber});

    if(mode === 'place') {
      setBoard(prev => ({
        ...prev,
        cells: prev.cells.map((cell, index) => {
          if(index === cellIndex) {
            return 'ship'
          }
          return cell
        })
      }))
    }

    if(mode === 'attack') {
      setBoard(prev => { 
        // mark the hit/miss on the board
        const newBoardState = markHitOrMiss(prev, {colIndex: colNumber, rowIndex: rowNumber});
        return markSunkenShip(newBoardState, {colIndex: colNumber, rowIndex: rowNumber});
      })
    }
  }

  return <div className="grid grid-cols-11 grid-rows-11 border-1 w-112 h-112">
    {Array.from({ length: 121 }).map((_, i) => {

      const colNumber = i % 11;
      const colLetter = columnLabels[colNumber];  
      const rowNumber = Math.floor(i / 11);
      const cellIndex = getCellIndex({colIndex: colNumber-1, rowIndex: rowNumber-1});

      if(rowNumber === 0) {
        // column labels
        return <div key={i} className="bg-gray-200 w-10 h-10 text-center items-center" data-cell-type="colLabel">{colLetter}</div>
      }

      if(colNumber === 0) {
        // row numbers
        return <div key={i} className="bg-gray-200 w-10 h-10 text-center" data-cell-type="rowLabel">{rowNumber}</div>
      }
      const Water = ()=><button key={i} onClick={handleCellClick} className="bg-blue-200 w-10 h-10 cursor-pointer border-l-1 border-t-1" data-cell-index={`${colNumber-1},${rowNumber-1}`}></button>;
      switch (board.cells[cellIndex]) {
        case 'water':
          return <Water/>
        case 'ship':
          if(hideShips) {
            return <Water/>
          }
          return <button key={i} onClick={handleCellClick} className="bg-green-200 w-10 h-10 cursor-pointer border-l-1 border-t-1" data-cell-index={`${colNumber-1},${rowNumber-1}`}></button>
        case 'hit':
          return <button key={i} onClick={handleCellClick} className="bg-red-200 w-10 h-10 cursor-pointer border-l-1 border-t-1" data-cell-index={`${colNumber-1},${rowNumber-1}`}></button>
        case 'wreck':
          return <button key={i} onClick={handleCellClick} className="bg-red-400 w-10 h-10 cursor-pointer border-l-1 border-t-1" data-cell-index={`${colNumber-1},${rowNumber-1}`}></button>
        case 'miss':
          return <button key={i} onClick={handleCellClick} className="bg-gray-400 w-10 h-10 cursor-pointer border-l-1 border-t-1" data-cell-index={`${colNumber-1},${rowNumber-1}`}></button>
      }

    })}
  </div>;
}

export default GameBoard;


