import type { GameMode } from "./GameBoard";

function GameStatus({mode, setMode}: {mode: GameMode, setMode: (mode: GameMode) => void}) {
  return <div className="col-span-2 m-auto mb-4">
    <p>Game mode: {mode}</p>
    <button className="bg-blue-200 cursor-pointer border-1 p-4" onClick={() => setMode('place')}>Place</button>
    <button className="bg-blue-200 cursor-pointer border-1 p-4" onClick={() => setMode('attack')}>Attack</button>
    
    </div>
}

export default GameStatus