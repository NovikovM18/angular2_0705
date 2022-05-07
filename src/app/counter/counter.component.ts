import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() todoList: Todo[];
  @Input() complite: number;
  @Input() noComplite: number;


  constructor() { }
  
  ngOnInit(): void {
  
  }

}
