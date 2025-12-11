import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Employee {
  id?: number;
  name: string;
  phone: string;
  address: string;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8081/api/employees';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(emp: Employee) {
    return this.http.post<Employee>(this.apiUrl, emp);
  }

  update(id: number, emp: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
