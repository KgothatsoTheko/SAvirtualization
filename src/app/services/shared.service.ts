import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  get(key: string, sessionType: string) {
    const data = sessionType == 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key)
    return data ? JSON.parse(data) : data
  }
}
