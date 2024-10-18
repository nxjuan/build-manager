// Definir o tipo dos dados que virão da API
import {Build} from './build.resource'

class BuildService {
    baseURL: string = 'http://localhost:8080/v1/build'

    async findAll() : Promise<Build[]> {
        const response = await fetch(this.baseURL)
        if (!response.ok) {
            throw new Error(`Erro ao buscar as builds: ${response.statusText}`);
        }
        return await response.json();
    };

    async findById(id: string) : Promise<Build> {
        console.log(id)
        const response = await fetch(this.baseURL + '/getById/' + id)
        if (!response.ok) {
            throw new Error(`Erro ao buscar as builds: ${response.statusText}`);
        }
        console.log(response)
        return await response.json(); 
    }
}

export const useBuildService = () => new BuildService();
