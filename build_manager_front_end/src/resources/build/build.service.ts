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
        const response = await fetch(this.baseURL + '/getById/' + id)
        if (!response.ok) {
            throw new Error(`Erro ao buscar as builds: ${response.statusText}`);
        }
        return await response.json(); 
    }

    async create(object: Record<string, any>): Promise<String> {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
        });
      
        if (!response.ok) {
          throw new Error(`Erro ao criar a build: ${response.statusText}`);
        }
      
        return await response.json();
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

}

export const useBuildService = () => new BuildService();
