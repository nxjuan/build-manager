'use client';
import { useState } from 'react';
import { useBuildService } from '@/resources/build/build.service';
import Link from 'next/link';
import Image from 'next/image';

export default function NewBuild() {
  const service = useBuildService();
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [color, setColor] = useState('#8A8A8A');
  const [nameError, setNameError] = useState('');
  const [cepError, setCepError] = useState('');

  // Função para buscar o endereço pelo CEP
  const fetchAddressFromCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setCity(data.localidade || '');
        setState(data.uf || '');
      } else {
        console.error('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
    }
  };

  // Função para lidar com a mudança do campo CEP
  const handleCepChange = (newCep: string) => {
    const sanitizedCep = newCep.replace(/[^0-9]/g, ''); // Remove hífens e caracteres não numéricos
    setCep(sanitizedCep);

    if (sanitizedCep.length === 8) {
      fetchAddressFromCep(sanitizedCep);
    }
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos obrigatórios
    let isValid = true;

    if (!name.trim()) {
      setNameError('O campo Nome é obrigatório.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!cep.trim() || cep.length !== 8) {
      setCepError('O campo CEP é obrigatório e deve conter 8 dígitos.');
      isValid = false;
    } else {
      setCepError('');
    }

    if (!isValid) return;

    // Criação do payload para enviar ao servidor
    const payload = {
      name,
      cep,
      city,
      state,
      color,
    };

    try {
      const response = await service.create(payload);
      console.log('Construção criada com sucesso:', response);

      // Resetando o formulário após sucesso
      setName('');
      setCep('');
      setCity('');
      setState('');
      setColor('#8A8A8A');
    } catch (error) {
      console.error('Erro ao criar a construção:', error);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen py-4 px-20">
      <div className="absolute top-4 left-4">
        <Link href={`/`}>
          <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
        </Link>
      </div>
      <h1 className="h-20 pt-3 h-full pl-[45%] font-bold text-xl text-white">
        Nova Construção
      </h1>
      <div className="bg-gray-500 py-10 flex items-center justify-center rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          {/* Campo Nome */}
          <label className="block">
            <span className="text-white font-semibold">Nome</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border-b ${nameError ? 'border-red-500' : 'border-gray-300'
                } bg-transparent text-white focus:outline-none focus:border-green-500 transition duration-200`}
              placeholder="Exemplo: Lojas Pimpa da Barra"
            />
            {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
          </label>

          {/* Campo CEP */}
          <label className="block">
            <span className="text-white font-semibold">CEP</span>
            <input
              type="text"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              className={`w-full border-b ${cepError ? 'border-red-500' : 'border-gray-300'
                } bg-transparent text-white focus:outline-none focus:border-green-500 transition duration-200`}
              placeholder="Exemplo: 12345678"
            />
            {cepError && <span className="text-red-500 text-sm">{cepError}</span>}
          </label>

          {/* Campo Cidade */}
          <label className="block">
            <span className="text-white font-semibold">Cidade</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent text-white focus:outline-none focus:border-green-500 transition duration-200"
              placeholder="Cidade"
              readOnly
            />
          </label>

          {/* Campo Estado */}
          <label className="block">
            <span className="text-white font-semibold">Estado</span>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent text-white focus:outline-none focus:border-green-500 transition duration-200"
              placeholder="Estado"
              readOnly
            />
          </label>

          {/* Campo Cor */}
          <label className="block">
            <span className="text-white font-semibold">Cor</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border-none bg-transparent text-white focus:outline-none transition duration-200 cursor-pointer"
            />
          </label>

          {/* Botões */}
          <div className="mt-6 flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-900 px-5 py-2 rounded-md text-white font-semibold"
              type="submit"
              title="Salvar"
            >
              Salvar
            </button>
            <button
              className="bg-black text-white hover:bg-red-500 px-5 py-2 rounded-md font-semibold"
              type="button"
              title="Cancelar"
              onClick={() => {
                setName('');
                setCep('');
                setCity('');
                setState('');
                setColor('#8A8A8A');
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
