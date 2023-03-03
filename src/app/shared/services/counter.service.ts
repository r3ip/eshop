import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  addCounter: EventEmitter<number> = new EventEmitter<number>();
  subtractCounter: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }


}
