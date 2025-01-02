'use client';

import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEmployeeService } from '@/resources/employee/employee.service';
import { Employee } from '@/resources/employee/employee.resource';
import Image from 'next/image';
import Link from 'next/link';
import { Presence } from '@/resources/presence/presence.resource';


export default function BuildDetails() {

  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);

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

      <div className='cursor-pointer '>

        <Link href={`/new_presence/${employee.id}?`}>
          <div className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl hover:bg-gray-500 flex items-center justify-center h-full">
            <Image src='/images/botao-adicionar 1.png' alt='adicionar' width={30} height={30} className=''></Image>
          </div>
        </Link>

      </div>

      <div>
        {Array.isArray(employee.presences) && employee.presences.map((presence: Presence, index: number) => (
          <div
            key={presence.id}
            className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl hover:bg-gray-500 relative" // `relative` aqui define o contexto
          >
            <p><strong>Data:</strong> {presence.date ? new Date(presence.date).toLocaleDateString() : 'Data indisponível'}</p>
            <p><strong>Start:</strong> {presence.start_time_work}</p>
            <p><strong>End:</strong> {presence.end_time_work}</p>

            <div className={`${!!presence.payed ? 'bg-green-500' : 'bg-yellow-400 '} text-gray-900 inline-flex px-2 rounded-md`}>
              {`${!!presence.payed ? 'pago' : 'a pagar'}`}
            </div>

            {/* Botão de edição posicionado no canto superior direito */}
            <div
              className="absolute top-2 right-2" // `absolute` para posicionar o ícone
              onMouseEnter={() => setHoveredIconIndex(index)}
              onMouseLeave={() => setHoveredIconIndex(null)}
            >
              <Link href={`/edit_presence/${employee.id}`}>
                <Image
                  src={hoveredIconIndex === index ? "/images/botao-editar (1).png" : "/images/botao-editar.png"}
                  alt="Botão Editar"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
