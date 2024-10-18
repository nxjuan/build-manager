'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBuildService } from '@/resources/build/build.service';
import { Build } from '@/resources/build/build.resource';
import Image from 'next/image';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  position: string;
}

export default function BuildDetails() {
  const { id } = useParams();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const useService = useBuildService();

  useEffect(() => {
    if (id) { 
      const fetchBuild = async () => {
        try {
          const result: Build = await useService.findById(id as string); 
          setBuild(result);
        } catch (error) {
          console.error('Erro ao buscar os detalhes da build:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBuild();
    }
  }, [id, useService]);

  if (loading) return <div>Carregando...</div>;
  if (!build) return <div>Build não encontrada</div>;

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">

      <div className="absolute top-4 left-4">
        <Link href="/">
          
            <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
          
        </Link>       
      </div>

      <div className='bg-gray-900 py-4 px-5 rounded-xl'>
        <h1 className="text-2xl font-bold mb-4">{build.name}</h1>
        <p>Endereço: {build.address}</p>
      </div>

      <div>
        {build.employees?.map((employee: Employee, index: number) => (
          <div key={employee.id} className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl">
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Nome:</strong> {employee.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
