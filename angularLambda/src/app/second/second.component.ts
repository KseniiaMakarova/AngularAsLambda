import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {WebsocketService} from "../websocket";

export interface IMessage {
  id: string;
  text: string;
}

@Component({
  templateUrl: `second.component.html`,
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  public messages$: Observable<IMessage[]>;
  value = '';

  constructor(private wsService: WebsocketService) {
  }

  ngOnInit() {
    this.messages$ = this.wsService.on<IMessage[]>('message');
  }

  public sendText(value: string): void {
    this.value = value;
    this.wsService.send('message', {text : this.value});
  }

  public disconnect(): void { // now this method doesn't work correctly
    this.wsService.ngOnDestroy();
  }
}
