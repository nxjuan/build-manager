'use client';

import { useState, useEffect } from 'react';
import { usePresenceService } from '@/resources/presence/presence.service';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Employee } from '@/resources/employee/employee.resource';

export default function EditPresence() {
    const { id } = useParams();
    const router = useRouter();
    const service = usePresenceService();
    const [date, setDate] = useState('');
    const [start_time_work, setStart_time_work] = useState('');
    const [end_time_work, setEnd_time_work] = useState('');
    const [type, setType] = useState('expediente');
    const [employee, setEmployee] = useState(new Employee());
    const presenceId = Array.isArray(id) ? id[0] : id;

    // Função para carregar os dados da presença ao montar o componente
    useEffect(() => {
        async function fetchPresence() {
            try {
                const presence = await service.findById(presenceId); // Busca a presença pelo ID
                setDate(presence.date ? new Date(presence.date).toISOString().split('T')[0] : '');
                setStart_time_work(presence.start_time_work?.split('T')[1].slice(0, 5) ?? ''); // Formata o tempo
                setEnd_time_work(presence.end_time_work?.split('T')[1].slice(0, 5) ?? ''); // Formata o tempo
                setType(presence.presence_type?.toLowerCase() ?? 'expediente'); // Preenche o tipo
            } catch (error) {
                console.error('Erro ao buscar dados da presença:', error);
            }
        }
        fetchPresence();
    }, [presenceId]);

    // Função para lidar com a submissão do formulário de atualização
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const payload = {
            date: new Date(date),
            start_time_work: new Date(`${date}T${start_time_work}Z`).toISOString().slice(0, -5) + 'Z',
            end_time_work: new Date(`${date}T${end_time_work}Z`).toISOString().slice(0, -5) + 'Z',
            payed: true,
            employee: employee,
            presence_type: type.toUpperCase()
        };

        try {
            // Chama a função `update` do serviço para atualizar a presença
            await service.update(presenceId, payload);
            router.push('/'); // Redireciona para a página principal após a atualização
        } catch (error) {
            console.error('Erro ao atualizar a presença:', error);
        }
    };

    // Função para limpar os campos do formulário
    const clearFields = () => {
        setDate('');
        setStart_time_work('');
        setEnd_time_work('');
        setType('expediente');
    };

    return (
        <div className="bg-gray-700 min-h-screen py-4 px-20">
            <div className="absolute top-4 left-4">
                <Link href={`/`}>
                    <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
                </Link>
            </div>

            <h1 className="h-20 pt-3 h-full flex justify-center text-xl font-bold text-white">
                Editar Presença
            </h1>

            <div className="bg-gray-500 py-10 flex items-center justify-center rounded-xl">
                <form onSubmit={handleSubmit}>
                    <label className="block text-white mb-1">Data</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="date"
                    />

                    <label className="block text-white mb-1">Início do Trabalho</label>
                    <input
                        type="time"
                        value={start_time_work}
                        onChange={(e) => setStart_time_work(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="start_time_work"
                    />

                    <label className="block text-white mb-1">Fim do Trabalho</label>
                    <input
                        type="time"
                        value={end_time_work}
                        onChange={(e) => setEnd_time_work(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="End_time_work"
                    />

                    <label className="block text-white mb-1">Tipo de Presença</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                    >
                        <option value="expediente">Expediente</option>
                        <option value="hora_extra">Hora Extra</option>
                        <option value="domingo">Domingo</option>
                        <option value="feriado">Feriado</option>
                    </select>

                    <div className="mt-6 flex justify-center gap-x-6">
                        <button className="bg-blue-600 hover:bg-blue-900 px-5 rounded-md text-white" type="submit" title="Salvar">
                            Salvar
                        </button>
                        <button
                            className="bg-black text-white hover:bg-red-500 px-5 rounded-md"
                            type="button"
                            title="Cancelar"
                            onClick={() => clearFields()}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
