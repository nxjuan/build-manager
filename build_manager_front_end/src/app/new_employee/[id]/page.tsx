'use client';
import { useState } from 'react';
import { useEmployeeService } from '@/resources/employee/employee.service'; // Importando o serviço
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Build } from '@/resources/build/build.resource'; // Importando a classe Build corretamente

export default function NewBuild() {
  const { id } = useParams();

  const service = useEmployeeService();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pix_key, setPix_Key] = useState('');
  const [hourly_rate, setHourly_rate] = useState('');
  const [sundays_value, setSundays_value] = useState('');
  const [overtime_value, setOvertime_value] = useState('');
  const presences = null;

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Criando uma instância de Build
    const build = new Build();
    build.id = Array.isArray(id) ? id[0] : id;

    const payload = {
      name,
      email,
      pix_key,
      build, // Adicionando o objeto Build diretamente
      hourly_rate: Number(hourly_rate),
      overtime_value: Number(overtime_value),
      sunday_value: Number(sundays_value)
    };

    try {
      console.table(payload)
      const response = await service.create(payload);
      console.log('Funcionário criado com sucesso:', response);
      
      // Reset dos campos
      clearFileds();
    } catch (error) {
      console.error('Erro ao criar o funcionário:', error);
    }
  };

  const clearFileds = ()=>{
      setName('');
      setEmail('');
      setPhone('');
      setPix_Key('');
      setHourly_rate('');
      setSundays_value('');
      setOvertime_value('');
  }

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
        </Link>       
      </div>

      <h1 className="h-20 pt-3 h-full flex justify-center text-xl font-bold">
        Cadastrar Funcionario
      </h1>

      <div className="bg-gray-500 py-10 flex items-center justify-center rounded-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="José Santos Silva"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="jose@email.com"
          />

          <input
            type="text"
            required
            value={pix_key}
            onChange={(e) => setPix_Key(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="23441004611"
          />

          <input
            type="number"
            required
            value={hourly_rate}
            onChange={(e) => setHourly_rate(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="18.00"
          />

          <input
            type="number"
            required
            value={overtime_value}
            onChange={(e) => setOvertime_value(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="25.00"
          />

          <input
            type="number"
            required
            value={sundays_value}
            onChange={(e) => setSundays_value(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="25.00"
          />

          <div className="mt-6 flex justify-center gap-x-6">
            <button
              className="bg-blue-600 hover:bg-blue-900 px-5 rounded-md"
              type="submit"
              title="Save"
            >
              Salvar
            </button>

            <button
              className="bg-black ml-10 text-white hover:bg-red-500 px-5 rounded-md"
              type="button"
              title="Cancel"
              onClick={() => clearFileds()}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
