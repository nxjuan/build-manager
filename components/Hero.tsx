/**
 * This code was generated by Builder.io.
 */
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex gap-10 items-center pb-0.5 pl-32 w-full text-white max-md:pl-5 max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[535px] max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="gap-2.5 self-start px-2.5 py-1.5 text-xs font-semibold tracking-wider whitespace-nowrap bg-teal-700 rounded-3xl">
            Bussiness
          </div>
          <h1 className="mt-2.5 text-6xl font-bold leading-[64px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
            Construindo sonhos, <br /> transformando <br /> realidades.
          </h1>
        </div>
        <p className="mt-10 text-xl leading-8 max-md:max-w-full">
          Desde 2003 a Conar Construtora busca pelo aperfeiçoamento na entrega
          de seus serviços. Especializada em obras de grande porte, a empresa
          preza pela qualidade, segurança e melhoria contínua na execução de
          seus projetos, trazendo modernidade e inovação aos seus clientes
        </p>
        <button className="flex overflow-hidden gap-4 justify-center items-center self-start py-3.5 pr-5 pl-5 mt-10 text-sm font-bold leading-none bg-teal-700 rounded-lg">
          <span className="self-stretch my-auto">Sign Up</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/911be1d7866f672bc91b6fa9834a661412cbaa891d722f37bb04d5ac949005ea?placeholderIfAbsent=true&apiKey=ecff52a1287e4a56b74a437cd1dc8e17"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-[1.42] stroke-[1.5px] stroke-white w-[17px]"
          />
        </button>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee08012b6fc29af2c0872ae5aab33296c30caf1497d1262aa3a4d0477a29a025?placeholderIfAbsent=true&apiKey=ecff52a1287e4a56b74a437cd1dc8e17"
        alt="Construction project visualization"
        className="object-contain self-stretch my-auto aspect-[1.34] min-w-[240px] w-[741px] max-md:max-w-full"
      />
    </section>
  );
};

export default Hero;
