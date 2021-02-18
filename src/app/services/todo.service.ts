import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {
  }

  addTodo(obj: any) {
    return this.http.post(environment.apiUrl + '/todo', obj);
  }

  getAllTodo() {
    return this.http.get(environment.apiUrl + '/todo');
  }

  updateTodo(obj: any) {
    return this.http.put(environment.apiUrl + '/todo', obj);
  }

  removeTodo(id: any) {
    return this.http.delete(environment.apiUrl + '/todo/' + id);
  }
}
