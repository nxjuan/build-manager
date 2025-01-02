'use client';

import { useState, useEffect } from 'react';
import { useEmployeeService } from '@/resources/employee/employee.service';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Build } from '@/resources/build/build.resource';

export default function EditEmployee() {
  const { id } = useParams();
  const router = useRouter();
  const service = useEmployeeService();

  // Estados para os dados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pix_key, setPix_Key] = useState('');
  const [hourly_rate, setHourly_rate] = useState('');
  const [sunday_value, setSundays_value] = useState('');
  const [overtime_value, setOvertime_value] = useState('');
  const [build, setBuild] = useState(new Build()); // Estado para armazenar o build associado
  const employeeId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    async function fetchEmployee() {
      if (!employeeId) {
        console.error('ID do funcionário não fornecido');
        return;
      }
      try {
        const employee = await service.findById(employeeId);
        setName(employee.name ?? '');
        setEmail(employee.email ?? '');
        setPix_Key(employee.pix_key ?? '');
        setHourly_rate(employee.hourly_rate ? employee.hourly_rate.toString() : '');
        setSundays_value(employee.sunday_value ? employee.sunday_value.toString() : '');
        setOvertime_value(employee.overtime_value ? employee.overtime_value.toString() : '');

        // Define o build associado ao employee
        if (employee.build) {
          const currentBuild = new Build();
          currentBuild.id = employee.build.id;
          currentBuild.name = employee.build.name;
          setBuild(currentBuild);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do funcionário:', error);
      }
    }
    fetchEmployee();
  }, [employeeId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      pix_key,
      build, // Inclui o build associado no payload
      hourly_rate: Number(hourly_rate),
      overtime_value: Number(overtime_value),
      sundays_value: Number(sunday_value),
    };

    try {
      await service.update(employeeId, payload);
      router.push('/');
    } catch (error) {
      console.error('Erro ao atualizar o funcionário:', error);
    }
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPix_Key('');
    setHourly_rate('');
    setSundays_value('');
    setOvertime_value('');
  };

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
        </Link>
      </div>

      <h1 className="h-20 pt-3 h-full flex justify-center text-xl font-bold text-white">
        Editar Funcionário
      </h1>

      <div className="bg-gray-500 py-10 flex items-center justify-center rounded-xl">
        <form onSubmit={handleSubmit}>
          <label className="block text-white mb-1">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <label className="block text-white mb-1">Chave Pix</label>
          <input
            type="text"
            required
            value={pix_key}
            onChange={(e) => setPix_Key(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <label className="block text-white mb-1">Valor por Hora</label>
          <input
            type="number"
            required
            value={hourly_rate}
            onChange={(e) => setHourly_rate(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <label className="block text-white mb-1">Valor Hora Extra</label>
          <input
            type="number"
            required
            value={overtime_value}
            onChange={(e) => setOvertime_value(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <label className="block text-white mb-1">Valor Domingo</label>
          <input
            type="number"
            required
            value={sunday_value}
            onChange={(e) => setSundays_value(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
          />
          <div className="mt-6 flex justify-center gap-x-6">
            <button className="bg-blue-600 hover:bg-blue-900 px-5 rounded-md text-white" type="submit">
              Salvar
            </button>
            <button
              className="bg-black text-white hover:bg-red-500 px-5 rounded-md"
              type="button"
              onClick={clearFields}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
