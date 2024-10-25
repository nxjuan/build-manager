import Image from "next/image";
import Link from "next/link";

export default function new_build (){
    return (
        <div className="bg-gray-700 min-h-screen py-4 px-20">
            <div className="absolute top-4 left-4">
                <Link href={`/`}>
          
                    <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
          
                </Link>       
            </div>

            <h1 className="h-20 pt-3 h-full pl-[45%] font-bold text-xl">
                Nova Construção
            </h1>
            <div className="bg-gray-500 h-[250px] flex items-center justify-center rounded-xl">
                <form action="" className="">
                    <input type="text" className="w-[500px] rounded-md block mb-4 pl-2" placeholder="Nome:  Lojas Pimpa da Barra" />
                    <input type="text" className="w-[500px] rounded-md block mb-4 pl-2" placeholder="Endereço:  Rio de janeiro, Barra da tijuca"  />
                    <input type="text" className="w-[500px] rounded-md block mb-4 pl-2" placeholder="Cor:  #68187A"  />
                </form>
            </div> 
        </div>
    )
}