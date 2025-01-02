import { Presence } from "./presence.resource";

class PresenceService {
    baseURL: string = 'http://localhost:8080/v1/presence'

    async create(presence: Presence): Promise<String> {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(presence)
        });
        if (![200, 201].includes(response.status)){
            throw new Error(`Erro ao adicionar presença: ${response.status}`);
        }
        return response.status.toString();
    }

    async update(id: string, object: Record<string, any>): Promise<string> {
        const response = await fetch(`${this.baseURL}/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
        });
    
        if (!response.ok) {
          throw new Error(`Erro ao atualizar a build: ${response.statusText}`);
        }
    
        return await response.json();
    }

    async findById(id: string) : Promise<Presence> {
        const response = await fetch(this.baseURL + '/getById/' + id)
        if(!response.ok){
            throw new Error(`Erro ao buscar os funcionarios: ${response.statusText}`)
        }
        return await response.json();
    }

    async payAllPresencesByEmployeeId(employeeId: string): Promise<string> {
        const response = await fetch(this.baseURL + '/payAllPresencesByEmployeeId/' + employeeId, {
            method: 'PATCH'
        });
    
        if (!response.ok) {
            throw new Error(`Erro ao atualizar as presenças do funcionário: ${employeeId} | erro: ${response.statusText}`);
        }
        
        const resposta = response.status.toString();
        console.log(resposta)
        // Retorna apenas o status
        return resposta
    }
    
}

export const usePresenceService = () => new PresenceService();