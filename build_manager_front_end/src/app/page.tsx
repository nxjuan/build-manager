import HeaderBar from "../components/HeaderBar";
import  BuildCard  from '../components/BuildCards'


export default function Home() {
  return (
    <main className="bg-gray-700 min-h-screen py-4 px-20">  
      <HeaderBar />
      <div className="grid grid-cols-auto-fit md:grid-cols-4 gap-12 text-center">
        <BuildCard />
      </div>
      
    </main>
  );
}
