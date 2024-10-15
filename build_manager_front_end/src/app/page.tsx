import Image from "next/image";
import { HeaderBar } from "../components/HeaderBar/HeaderBar";

const headerBar = HeaderBar();

export default function Home() {
  return (
    <main className="bg-gray-700 min-h-screen py-4 px-20">  
      {headerBar}
    </main>
  );
}
