import type { Route } from "./+types/game";
import Battleship from "~/components/Battleship";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "🚢 Battleship" },
    { name: "description", content: "Play Battleship" },
  ];
}

export default function Home() {
  return <Battleship />;
}
