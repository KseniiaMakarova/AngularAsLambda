import { Component, OnInit } from '@angular/core';
import { EchoService } from '../echo.service';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Component({
  templateUrl: `second.component.html`,
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  public response: Observable<any>;
  socket: any;

  constructor(private echoService: EchoService) {}

  public ngOnInit(): void {
    this.response = this.echoService.makeCall();
    this.socket = io('https://2bmasodkz9.execute-api.eu-central-1.amazonaws.com/v1/ws/');
    this.listen('/chat').subscribe(data => console.log("received something!"));
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, data => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }

  public createNewEntity(): void {
    console.log("button clicked!");
  }
}
