'use client';
import { useState } from 'react';
import { usePresenceService } from '@/resources/presence/presence.service'; // Importando o serviço
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Employee } from '@/resources/employee/employee.resource';

export default function NewPresence() {
    const { id } = useParams();
    const service = usePresenceService(); // Instanciando o serviço
    const [date, setDate] = useState('');
    const [start_time_work, setStart_time_work] = useState('');
    const [end_time_work, setEnd_time_work] = useState('');
    const [type, setType] = useState('expediente');

    const employee = new Employee();
    employee.id = Array.isArray(id) ? id[0] : id;    

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Criação do payload para enviar ao servidor
        const payload = {
            date: new Date(date), // `date` como Date
            start_time_work: new Date(`${date}T${start_time_work}Z`).toISOString().slice(0, -5) + 'Z',
            end_time_work: new Date(`${date}T${end_time_work}Z`).toISOString().slice(0, -5) + 'Z',
            payed: true,
            employee: employee,
            presence_type: type.toUpperCase() // Converte para maiúsculas
        };

        try {
            console.log(payload);
            const response = await service.create(payload);

            console.log('Presença criada com sucesso:', response);

            console.table(payload);

            setDate('');
            setStart_time_work('');
            setEnd_time_work('');
            setType('expediente');
        } catch (error) {
            console.error('Erro ao criar a construção:', error);
        }
    };

    const clearFileds = ()=>{
        
        setDate('');
        setStart_time_work('');
        setEnd_time_work('');
        setType('');
    }

    return (
        <div className="bg-gray-700 min-h-screen py-4 px-20">
            <div className="absolute top-4 left-4">
                <Link href={`/`}>
                    <Image src="/images/botao-voltar 1.png" alt="Botão Voltar" width={30} height={30} />
                </Link>
            </div>

            <h1 className="h-20 pt-3 h-full pl-[45%] font-bold text-xl text-white">
                Adicionar Presença
            </h1>

            <div className="bg-gray-500 h-[250px] flex items-center justify-center rounded-xl">
                <form onSubmit={handleSubmit}>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="date"
                    />
                    <input
                        type="time"
                        value={start_time_work}
                        onChange={(e) => setStart_time_work(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="start_time_work"
                    />
                    <input
                        type="time"
                        value={end_time_work}
                        onChange={(e) => setEnd_time_work(e.target.value)}
                        className="w-[500px] text-gray-400 rounded-md block mb-4 pl-2 focus:text-gray-600"
                        placeholder="End_time_work"
                    />
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

                    <div className="mt-6 items-center justify-end gap-x-6">
                        <button className="bg-blue-600 hover:bg-blue-900 px-5 rounded-md text-white" type="submit" title="Salvar">
                            Salvar
                        </button>
                        <button
                            className="bg-black ml-10 text-white hover:bg-red-500 px-5 rounded-md"
                            type="button"
                            title="Cancelar"
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
