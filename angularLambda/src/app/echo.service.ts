import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  constructor(private httpClient: HttpClient) {}

  public makeCall(): Observable<any> {
    return this.httpClient.get<any>('https://dd6fmot6p4.execute-api.eu-central-1.amazonaws.com/v1/');
  }
}
