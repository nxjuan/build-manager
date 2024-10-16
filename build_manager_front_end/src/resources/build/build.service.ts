// Definir o tipo dos dados que virão da API
import {Build} from './build.resource'

class BuildService {
    baseURL: string = 'http://localhost:8080/v1/build'

    async buscar(query: string = "", extension: string = "") : Promise<Build[]> {
        const response = await fetch(this.baseURL)
        return await response.json();
    }
}

export const useBuildService = () => new BuildService();
