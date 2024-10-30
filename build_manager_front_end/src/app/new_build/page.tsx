'use client';
import { useState } from 'react';
import { useBuildService } from '@/resources/build/build.service'; // Importando o serviço

export default function NewBuild() {
  const service = useBuildService(); // Instanciando o serviço
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [color, setColor] = useState('');

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Criação do payload para enviar ao servidor
    const payload = {
      name,
      address,
      color,
    };

    try {
      // Chamando a função `create` do serviço
      const response = await service.create(payload);

      // Aqui você pode tratar o retorno, caso seja necessário
      console.log('Construção criada com sucesso:', response);

      // Resetando o formulário após sucesso
      setName('');
      setAddress('');
      setColor('');
    } catch (error) {
      console.error('Erro ao criar a construção:', error);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">
      <h1 className="h-20 pt-3 h-full pl-[45%] font-bold text-xl text-white">
        Nova Construção
      </h1>
      <div className="bg-gray-500 h-[250px] flex items-center justify-center rounded-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="Nome: Lojas Pimpa da Barra"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="Endereço: Rio de Janeiro, Barra da Tijuca"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
            placeholder="Cor: #68187A"
          />
          <div className="mt-6 items-center justify-end gap-x-6">
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
              onClick={() => {
                setName('');
                setAddress('');
                setColor('');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
