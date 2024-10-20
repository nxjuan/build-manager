import {Employee} from './employee.resource'

class EmployeeService {
    baseUrl: string = 'http://localhost:8080/v1/employee'

    async findById(id: string) : Promise<Employee> {
        const response = await fetch(this.baseUrl + '/getById/' + id)
        if(!response.ok){
            throw new Error(`Erro ao buscar os funcionarios: ${response.statusText}`)
        }
        return await response.json();
    }
}

export const useEmployeeService = () => new EmployeeService();