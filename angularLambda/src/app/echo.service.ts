import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  constructor(private httpClient: HttpClient) {}

  public makeCall(): Observable<any> {
    return this.httpClient.get<any>('https://c26qspcxzh.execute-api.eu-central-1.amazonaws.com/v1/chat');
  }
}
