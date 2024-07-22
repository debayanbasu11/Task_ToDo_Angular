import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/users", {
      headers: this.createAuthorizationHeader()
    });
  }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/admin/task", taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(BASIC_URL + 'api/admin/task/' + id, taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchTask(title: string): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/tasks/search/' + title, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }

  getAllTasks(): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/tasks", {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(BASIC_URL + "api/admin/task/" + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/task/" + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(id: number, content: string): Observable<any> {
    const params = {
      content: content
    }
    return this.http.post(BASIC_URL + "api/admin/task/comment/" + id, null, {
      params: params,
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentsByTask(taskId: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/admin/comments/" + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }
}
