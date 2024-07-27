import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = "http://localhost:0217"

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post(`${this.serverUrl}/login`, body);
  }

  refreshToken(body: any) {
    return this.http.post(`${this.serverUrl}/token`, body);
  }

  genericPost(endpoint:any, body:any) {
    return this.http.post(this.serverUrl + endpoint, body)
  }

  genericGet(endpoint:string) {
    return this.http.get(this.serverUrl + endpoint)
  }

  genericDelete(endpoint:string) {
    return this.http.delete(this.serverUrl + endpoint)
  }

  genericUpdate(endpoint:any, body:any) {
    return this.http.post(this.serverUrl + endpoint, body)
  }
}
