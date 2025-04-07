import { Outlet } from "react-router";


export default function GameLayout() {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-4xl tracking-wide">🚢 Battleship</h1>
      <p className="text-center text-lg">Place your ships and hit Play</p>
      <Outlet />

    </div>
  );
}