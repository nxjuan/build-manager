// QRCodePopUp.tsx
import { FC, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Employee } from '@/resources/employee/employee.resource';
import { usePresenceService } from '@/resources/presence/presence.service';

interface QRCodePopUpProps {
    employee: Employee;
    onClose: () => void;
}

const QRCodePopUp: FC<QRCodePopUpProps> = ({ employee, onClose }) => {
    const [workHours, setWorkHours] = useState({ hours: '00:00', amount: 0 });
    const [extraHours, setExtraHours] = useState({ hours: '00:00', amount: 0 });
    const [sundayHours, setSundayHours] = useState({ hours: '00:00', amount: 0 });
    const [pixCopiaCola, setPixCopiaCola] = useState('');
    const [qrCodeImage, setQrCodeImage] = useState('');

    const presenceService = usePresenceService();

    const txid = 'bm1234'
    const pixKey = employee.pix_key || '';
    const receiverName = employee.name || 'Nome Indisponível';
    const city = employee.build?.city || 'Vitoria';
    const description = 'Acerto de Diárias'

    const transationId = ''


    // essa aq calcula o val da soma das horas
    useEffect(() => {
        const calculateUnpaidHours = () => {
            let totalWorkMinutes = 0;
            let totalOvertimeMinutes = 0;
            let totalSundayMinutes = 0;

            let totalWorkAmount = 0;
            let totalOvertimeAmount = 0;
            let totalSundayAmount = 0;

            employee.presences?.forEach((presence) => {
                if (!presence.payed) {
                    const duration = Number(presence.duration_time_work ?? 0);

                    switch (presence.presence_type) {
                        case 'EXPEDIENTE':
                            totalWorkMinutes += duration;
                            totalWorkAmount += (duration / 60) * (employee.hourly_rate ?? 0);
                            break;

                        case 'HORA_EXTRA':
                            totalOvertimeMinutes += duration;
                            totalOvertimeAmount += (duration / 60) * (employee.overtime_value ?? 0);
                            break;

                        case 'DOMINGO':
                            totalSundayMinutes += duration;
                            totalSundayAmount += (duration / 60) * (employee.sunday_value ?? 0);
                            break;

                        default:
                            console.warn('Tipo de presença desconhecido:', presence.presence_type);
                    }
                }
            });

            const formatTime = (minutes: number) => {
                const hrs = Math.floor(minutes / 60).toString().padStart(2, '0');
                const mins = (minutes % 60).toString().padStart(2, '0');
                return `${hrs}:${mins}`;
            };

            setWorkHours({ hours: formatTime(totalWorkMinutes), amount: totalWorkAmount });
            setExtraHours({ hours: formatTime(totalOvertimeMinutes), amount: totalOvertimeAmount });
            setSundayHours({ hours: formatTime(totalSundayMinutes), amount: totalSundayAmount });
        };

        calculateUnpaidHours();
    }, [employee.presences, employee.hourly_rate, employee.overtime_value, employee.sunday_value]);


    const amount = (
        workHours.amount + extraHours.amount + sundayHours.amount
    ).toFixed(2);

    const markAllAsPaid = async () => {
        if (!employee.id) {
            console.error('ID do funcionário está ausente.');
            alert('Erro: ID do funcionário não encontrado.');
            return;
        }
    
        const userConfirmed = window.confirm(
            'Você tem certeza de que deseja marcar todas as presenças como pagas?'
        );
    
        if (!userConfirmed) {
            return;
        }
    
        try {
            await presenceService.payAllPresencesByEmployeeId(employee.id)
        } catch (error) {
            console.error('Erro ao marcar como pago:', error);
            alert('Erro ao atualizar as presenças. Tente novamente.');
        }
    };
    
    

    useEffect(() => {

        const generatePix = async () => {

            const ID_PAYLOAD_FORMAT_INDICATOR = '00' + '02' + '01';
            const ID_MERCHANT_ACCOUNT_INFORMATION =
                '26' + (pixKey.length + 22)
                + '0014br.gov.bcb.pix01'
                + pixKey.length
                + pixKey;
            const ID_MERCHANT_CATEGORY_CODE = '52' + '04' + '0000';
            const ID_TRANSACTION_CURRENCY = '53' + '03' + '986';
            const ID_TRANSACTION_AMOUNT =
                '54'
                + amount.length.toString().padStart(2, '0')
                + amount;
            const ID_COUNTRY_CODE = '58' + '02' + 'BR';
            const ID_MERCHANT_NAME =
                '59'
                + receiverName.length.toString().padStart(2, '0')
                + receiverName;
            const ID_MERCHANT_CITY =
                '60'
                + city.length.toString().padStart(2, '0')
                + city;
            const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62' + '07' + '05' + '03' + '***';
            const ID_CRC16 = '63' + '04';

            const pixPayload =
                ID_PAYLOAD_FORMAT_INDICATOR
                + ID_MERCHANT_ACCOUNT_INFORMATION
                + ID_MERCHANT_CATEGORY_CODE
                + ID_TRANSACTION_CURRENCY
                + ID_TRANSACTION_AMOUNT
                + ID_COUNTRY_CODE
                + ID_MERCHANT_NAME
                + ID_MERCHANT_CITY
                + ID_ADDITIONAL_DATA_FIELD_TEMPLATE
                + ID_CRC16

            const crc16 = (data: string) => {
                let crc = 0xFFFF;
                for (let i = 0; i < data.length; i++) {
                    crc ^= data.charCodeAt(i) << 8;
                    for (let j = 0; j < 8; j++) {
                        if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
                        else crc <<= 1;
                    }
                    crc &= 0xFFFF;
                }
                return crc.toString(16).toUpperCase().padStart(4, '0');
            };

            const finalPixPayload = pixPayload + crc16(pixPayload);
            setPixCopiaCola(finalPixPayload);

            // Gerar QR Code
            const qrCode = await QRCode.toDataURL(finalPixPayload);
            setQrCodeImage(qrCode);
        };

        generatePix();
    }, [employee.pix_key, employee.name, amount, city]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
                <h2 className="text-xl font-bold mb-4">Detalhes de Pagamento</h2>
                <p>Valor da Hora: R$ {employee.hourly_rate?.toFixed(2)}</p>
                <p>Valor do Domingo: R$ {employee.sunday_value?.toFixed(2)}</p>
                <p>Valor de Horas Extras: R$ {employee.overtime_value?.toFixed(2)}</p>

                <h3 className="mt-4 font-bold">Detalhes de Horas a Receber:</h3>
                <p>Horas trabalhadas: {workHours.hours} (R$ {workHours.amount.toFixed(2)} a receber)</p>
                <p>Horas extras trabalhadas: {extraHours.hours} (R$ {extraHours.amount.toFixed(2)} à receber)</p>
                <p>Finais de semana trabalhados: {sundayHours.hours} (R$ {sundayHours.amount.toFixed(2)} à receber)</p>

                <h3 className="mt-4 font-bold">QR Code Pix:</h3>
                {qrCodeImage && <img src={qrCodeImage} alt="QR Code Pix" className="mx-auto" />}

                <h3 className="mt-4 font-bold">Pix Copia e Cola:</h3>
                <p
                    className="bg-gray-100 p-2 rounded text-center cursor-pointer hover:bg-gray-200"
                    onClick={() => navigator.clipboard.writeText(pixCopiaCola)}
                >
                    {pixCopiaCola}
                </p>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-800"
                    onClick={markAllAsPaid}
                >
                    Marcar Tudo como Pago
                </button>
            </div>
        </div>
    );
};

export default QRCodePopUp;
