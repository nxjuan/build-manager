import { Employee } from "../employee/employee.resource";

// Enum para os tipos de presença
export enum PresenceType {
    Expediente = 'EXPEDIENTE',
    HoraExtra = 'HORA_EXTRA',
    Domingo = 'DOMINGO',
}

export class Presence {
    id?: string;
    date?: Date;
    start_time_work?: string;  
    end_time_work?: string;    
    employee?: Employee;
    presence_type?: PresenceType;
    payed?: boolean;
    duration_time_work?: number;
}

