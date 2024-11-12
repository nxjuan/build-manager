'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBuildService } from '@/resources/build/build.service';
import { Build } from '@/resources/build/build.resource';
import Image from 'next/image';
import Link from 'next/link';
import { Employee } from '@/resources/employee/employee.resource';
import QRCodePopUp from '@/components/QRCodePopUp';

export default function BuildDetails() {
  const { id } = useParams();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const useService = useBuildService();

  // Estados de hover e pop-up
  const [hoveredEditIconIndex, setHoveredEditIconIndex] = useState<number | null>(null);
  const [hoveredQrIconIndex, setHoveredQrIconIndex] = useState<number | null>(null);
  const [showQrCodePopup, setShowQrCodePopup] = useState<{ visible: boolean; employeeId: string | undefined } | null>(null);

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

      <div className='cursor-pointer'>
        <Link href={`/new_employee/${build.id}`}>
          <div className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl hover:bg-gray-500 flex items-center justify-center h-full">
            <Image src='/images/botao-adicionar 1.png' alt='adicionar' width={30} height={30} />
          </div>
        </Link>
      </div>

      <div>
        {build.employees?.map((employee: Employee, index: number) => (
          <div key={employee.id} className="p-2 bg-gray-600 mt-3 mb-3 rounded-xl hover:bg-gray-500 relative">
            <Link href={`/employee/${employee.id}?buildId=${build.id}`}>
              <p><strong>Nome:</strong> {employee.name}</p>
              <p><strong>N° presences:</strong> {Array.isArray(employee.presences) ? employee.presences.length : 0}</p>
            </Link>

            <div className="absolute top-2 right-2 flex space-x-2">
              <Link href={`/edit_employee/${employee.id}`}>
                <Image
                  src={hoveredEditIconIndex === index ? "/images/botao-editar (1).png" : "/images/botao-editar.png"}
                  alt="Botão Editar"
                  width={30}
                  height={30}
                  onMouseEnter={() => setHoveredEditIconIndex(index)}
                  onMouseLeave={() => setHoveredEditIconIndex(null)}
                />
              </Link>

              {/* Ícone de QR Code com botão para abrir o pop-up */}
              <button onClick={() => setShowQrCodePopup({ visible: true, employeeId: employee.id })}>
                <Image
                  src={hoveredQrIconIndex === index ? "/images/codigo-qr (1).png" : "/images/codigo-qr.png"}
                  alt="Código QR"
                  width={30}
                  height={30}
                  onMouseEnter={() => setHoveredQrIconIndex(index)}
                  onMouseLeave={() => setHoveredQrIconIndex(null)}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de Pop-up do QR Code */}
      {showQrCodePopup?.visible && (
        <QRCodePopUp
          employeeId={showQrCodePopup.employeeId}
          onClose={() => setShowQrCodePopup(null)}
        />
      )}
    </div>
  );
}
