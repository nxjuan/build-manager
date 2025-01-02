'use client'

import { useState, useEffect } from 'react';
import { useBuildService } from '../resources/build/build.service'
import { Build } from '../resources/build/build.resource'
import React from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function BuildCard() {

    const useService = useBuildService();
    const [builds, setBuilds] = useState<Build[]>([]);
    const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null); // Estado para controlar hover do ícone
    const [addButtonImage, setAddButtonImage] = useState('/images/botao-adicionar.png');

    useEffect(() => {
        async function fetchBuilds() {
            const result = await useService.findAll();
            setBuilds(result);  // Atualiza o estado com os dados da API
            console.table(result[1]);  // Exibe no console o segundo item (índice 1) após a requisição
        }
        fetchBuilds();  // Chama a função para buscar os dados
    }, []);

    return (
        <>
            {builds.map((build, index) => (
                <Link key={build.id} href={`/build/${build.id}`}>
                    <div
                        key={index}
                        className={`
                            w-full h-[300px] rounded-xl p-4 hover:bg-gray-900 hover:text-white hover:border 
                            hover:border-white cursor-pointer relative
                        `}
                        style={{ backgroundColor: build.color ? build.color : '#333333' }}
                    >
                        <h2 className="break-words">{build.name}</h2>
                        <p className="mt-5">People: {Array.isArray(build.employees) ? build.employees.length : 0}</p>

                        {/* Ícone Editar - Hover aplicado nesta div menor */}
                        <div
                            className="absolute bottom-4 right-4"
                            onMouseEnter={() => setHoveredIconIndex(index)}  // Define o índice em hover para o ícone
                            onMouseLeave={() => setHoveredIconIndex(null)}   // Reseta o índice ao sair do ícone
                        >
                            <Link href={`edit_build/${build.id}`}>
                                <Image
                                    src={hoveredIconIndex === index ? "/images/botao-editar (1).png" : "/images/botao-editar.png"}
                                    alt="Botão Editar"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Botão de Adicionar Novo Build */}
            <Link href='/new_build'>
                <div
                    className="
                        bg-gray-300 w-full h-[300px] rounded-xl p-4 
                        text-gray-700 hover:bg-gray-900 hover:border 
                        hover:border-white cursor-pointer flex flex-col items-center justify-center
                    "
                    onMouseEnter={() => setAddButtonImage('/images/botao-adicionar 1.png')}
                    onMouseLeave={() => setAddButtonImage('/images/botao-adicionar.png')}
                >
                    <Image src={addButtonImage} alt="Botão Adicionar" width={60} height={60} />
                </div>
            </Link>
        </>
    );
}
