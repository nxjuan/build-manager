'use client'

import { useState, useEffect } from 'react';
import { useBuildService } from '../resources/build/build.service'
import {Build} from '../resources/build/build.resource'
import React from "react";

export default function BuildCard() {

    const useService = useBuildService();
    const [build, setBuild] = useState<Build[]>([]);

    useEffect(() => {
        async function fetchBuilds() {
          const result = await useService.buscar();
          setBuild(result);  // Atualiza o estado com os dados da API
          console.table(result[1]);  // Exibe no console o segundo item (índice 1) após a requisição
        }
    
        fetchBuilds();  // Chama a função para buscar os dados
      }, []);

    return (   
        <>
            {build.map((build, index) => (
                <div key={index} className='bg-gray-300 w-full h-[300px] rounded-xl p-4 text-gray-700'>
                <h2>{build.name}</h2>
                <p className='mt-10'>{build.address}</p>
                <p className='mt-20'>People: {Array.isArray(build.employees) ? build.employees.length : 0}</p>
                </div>
            ))}
        </>
    )
}