import { Build } from '../build/build.resource'
import { Presence } from '../presence/presence.resource';

export class Employee {
    id?: string;
    name?: string; 
    email?: string; 
    build?: Build; 
    pix_key?: string; 
    hourly_rate?: number; 
    overtime_value?: number; 
    sunday_value?: number; 
    presences?: Presence[];
}
