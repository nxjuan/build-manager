'use client';

import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEmployeeService } from '@/resources/employee/employee.service';
import { Employee } from '@/resources/employee/employee.resource';
import Image from 'next/image';
import Link from 'next/link';

interface Presence {
    id: string;
    date: string;
    duration_time_work: string;
    start_time_work: string;
    end_time_work: string;
}

export default function BuildDetails() {
  const { id } = useParams();
  const [employee, setemployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const useService = useEmployeeService();
  const searchParams = useSearchParams();
  const buildId = searchParams.get('buildId');

  useEffect(() => {
    if (id) { 
      const fetchEmployee = async () => {
        try {
          const result: Employee = await useService.findById(id as string); 
          setemployee(result);
        } catch (error) {
          console.error('Erro ao buscar os detalhes da build:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id, useService]);

  if (loading) return <div>Carregando...</div>;
  if (!employee) return <div>Employee não encontrado</div>;

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">

      <div className="absolute top-4 left-4">
        <Link href={`/build/${buildId}`}>
          
            <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
          
        </Link>       
      </div>

      <div className='bg-gray-900 py-4 px-5 rounded-xl'>
        <h1 className="text-2xl font-bold mb-4">{employee.name}</h1>
        <p>Pix: {employee.pix_key}</p>
        <p>Presences: {Array.isArray(employee.presences) ? employee.presences.length : 0}</p>
      </div>
      
      <div>
        {employee.presences?.map((presence: Presence, index: number) => (

          
            <div key={presence.id} className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl hover:bg-gray-500">
              <p><strong>Data:</strong> {presence.date}</p>
              <p><strong>Start:</strong> {presence.start_time_work}</p>
              <p><strong>End:</strong> {presence.end_time_work}</p>
            </div>
          

        ))}
      </div>      

    </div>
  );
}
