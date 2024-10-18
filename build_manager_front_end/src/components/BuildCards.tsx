'use client'

import { useState, useEffect } from 'react';
import { useBuildService } from '../resources/build/build.service'
import {Build} from '../resources/build/build.resource'
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
export default function BuildCard() {

    const useService = useBuildService();
    const [build, setBuild] = useState<Build[]>([]);
    const [imageSrc, setImageSrc] = useState('/images/botao-adicionar.png');

    useEffect(() => {
        async function fetchBuilds() {
          const result = await useService.findAll();
          setBuild(result);  // Atualiza o estado com os dados da API
          console.table(result[1]);  // Exibe no console o segundo item (índice 1) após a requisição
        }
    
        fetchBuilds();  // Chama a função para buscar os dados
      }, []);

    return (   
        <>
            {build.map((build, index) => (
                <Link key={build.id} href={`/build/${build.id}`}>
                    <div key={index} className='
                        bg-gray-300 w-full h-[300px] rounded-xl p-4 
                        text-gray-700 hover:bg-gray-900 hover:text-white hover:border 
                        hover:border:white cursor-pointer'>
                        <h2>{build.name}</h2>
                        <p className='mt-10'>{build.address}</p>
                        <p className='mt-5'>People: {Array.isArray(build.employees) ? build.employees.length : 0}</p>
                    </div>
                </Link>
            ))}
            <Link href=''>
                <div
                    className='
                    bg-gray-300 w-full h-[300px] rounded-xl p-4 
                    text-gray-700 hover:bg-gray-900 hover:border 
                    hover:border-white cursor-pointer flex flex-col items-center justify-center'
                    // Mudar a imagem quando o mouse entrar (onMouseEnter) e voltar à original quando sair (onMouseLeave)
                    onMouseEnter={() => setImageSrc('/images/botao-adicionar 1.png')}
                    onMouseLeave={() => setImageSrc('/images/botao-adicionar.png')}
                >
                    <Image src={imageSrc} alt="Botão Adicionar" width={60} height={60} />
                </div>
            </Link>
        </>
    )
}