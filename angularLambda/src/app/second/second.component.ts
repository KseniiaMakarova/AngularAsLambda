import { Component, OnInit } from '@angular/core';
import { EchoService } from '../echo.service';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  templateUrl: `second.component.html`,
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  public response: Observable<any>;
  ws: WebSocketSubject<any>;
  stringWsObservable: Observable<string>;
  connected: boolean;

  constructor(private echoService: EchoService) {}

  public ngOnInit(): void {
    this.response = this.echoService.makeCall();
    this.connect();
  }

  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    this.ws = webSocket('wss://ow8y4v8aj3.execute-api.eu-central-1.amazonaws.com/v1'); // returns a WebSocketSubject


    this.stringWsObservable = this.ws.multiplex(
      () => ({subscribe: 'someone subscribed'}),
      () => ({unsubscribe: 'someone unsubscribed'}),
      () => true
    );

    this.stringWsObservable.subscribe(
      value => {
        console.log('received something: ' + value);
        this.response = this.echoService.makeCall();
      },
      () => console.log("something went wrong")
    );

    this.connected = true;
  }

  public createNewEntity(): void {
    this.ws.next('message sent!');
    console.log("button clicked!");
  }
}
