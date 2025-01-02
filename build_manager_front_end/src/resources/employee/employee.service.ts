import {Employee} from './employee.resource'

class EmployeeService {
    baseURL: string = 'http://localhost:8080/v1/employee'

    async findById(id: string) : Promise<Employee> {
        const response = await fetch(this.baseURL + '/getById/' + id)
        if(!response.ok){
            throw new Error(`Erro ao buscar os funcionarios: ${response.statusText}`)
        }
        return await response.json();
    }

    async create(employee: Employee): Promise<String> {
              
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
      
        if (![200, 201].includes(response.status)) {
          throw new Error(`Erro ao criar o funcionario - fn createEmployee : ${response.status}`);
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
}

export const useEmployeeService = () => new EmployeeService();