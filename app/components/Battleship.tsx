import React from "react";
import GameBoard, { type GameMode } from "./GameBoard"
import GameStatus from "./GameStatus";

function Battleship() {
  const [mode, setMode] = React.useState<GameMode>('place')
  return  <div className="grid grid-cols-2">
    <GameStatus mode={mode} setMode={setMode}/>
    <div>
      <h2>Your Fleet</h2>
      <p>Enemy hits will land here</p>
      <GameBoard mode={mode} hideShips={false}/>
    </div>
    <div>
      <h2>Enemy Fleet</h2>
      <p>Your hits will land here</p>
      <GameBoard mode={mode} hideShips={true}/>
    </div>
  </div>
}

export default Battleship;
