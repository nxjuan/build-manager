// EditBuild.tsx
'use client';

import { useState, useEffect } from 'react';
import { useBuildService } from '@/resources/build/build.service';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function EditBuild() {
    const service = useBuildService();
    const router = useRouter();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [color, setColor] = useState('');
    const buildId = Array.isArray(id) ? id[0] : id;

    // Função para carregar os dados existentes do build
    useEffect(() => {
        async function fetchBuild() {
            try {
                const build = await service.findById(buildId);
                setName(build.name ?? '');
                setCep(build.cep ?? '');
                setCity(build.city ?? '');
                setState(build.state ?? '');
                setColor(build.color ?? '');
            } catch (error) {
                console.error('Erro ao buscar dados da construção:', error);
            }
        }
        fetchBuild();
    }, [id]);

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
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = e.target.value;
        setCep(newCep);

        if (newCep.length === 8) {
            fetchAddressFromCep(newCep);
        }
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Criação do payload para enviar ao servidor
        const payload = {
            name,
            cep,
            city,
            state,
            color,
        };

        try {
            console.table(payload);
            await service.update(buildId, payload);

            router.push('/');
        } catch (error) {
            console.log(buildId);
            console.error('Erro ao atualizar a construção:', error);
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
                Editar Construção
            </h1>
            <div className="bg-gray-500 py-10 flex items-center justify-center rounded-xl">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="CEP"
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="Cidade"
                        readOnly
                    />
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="Estado"
                        readOnly
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="Cor"
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
                            onClick={() => router.push('/')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}