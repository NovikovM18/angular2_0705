import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  reactiveForm: FormGroup;
  public todoList: Todo[] = [];
  private httpClient: HttpClient;
  public complite: number;
  public noComplite: number;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      title: new FormControl(''),
      limit: new FormControl(20)
    });

    this.httpClient.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?_limit=${this.reactiveForm.value.limit}`)
      .subscribe((todoList: Todo[]) => {
        this.todoList = todoList;
        this.complite = this.todoList.filter(todo => (todo.completed)).length;
        this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
      });
    };
    
    getNewLimitTodo() {
      this.httpClient.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?_limit=${this.reactiveForm.value.limit}`)
      .subscribe((todoList: Todo[]) => {
        this.todoList = todoList;
        this.complite = this.todoList.filter(todo => (todo.completed)).length;
        this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
      });
    };

    addTodo():void {
      if (this.reactiveForm.value.title) {
        const newTodo = {userId: 21, id: Date.now(), title: this.reactiveForm.value.title, completed: false};
        this.todoList.unshift(newTodo);

        // this.httpClient.post<Todo>('https://jsonplaceholder.typicode.com/todos', 
        // {userId: 21, id: Date.now(), title: this.reactiveForm.value.title, completed: false})
        //   .subscribe((todo: Todo) => {
        //     this.todoList.unshift(todo);
        // this.complite = this.todoList.filter(todo => (todo.completed)).length;
        // this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
        // this.reactiveForm.reset();
        //   });
        this.complite = this.todoList.filter(todo => (todo.completed)).length;
        this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
        this.reactiveForm.reset();
      }
    };

    delTodo(todoOnDel: Todo) {
      // this.httpClient.delete<void>('https://jsonplaceholder.typicode.com/todos/' + todoOnDel.id)
      // .subscribe(() => {
      //   this.todoList = this.todoList.filter(todo => todo.id !== todoOnDel.id);
      //   this.complite = this.todoList.filter(todo => (todo.completed)).length;
      //   this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
      // })
      this.todoList = this.todoList.filter(todo => todo.id !== todoOnDel.id);
      this.complite = this.todoList.filter(todo => (todo.completed)).length;
      this.noComplite = this.todoList.filter(todo => (!todo.completed)).length;
    };
    
    onCompleteed(todoOnUpdate: Todo) {
      // this.httpClient.patch<Todo>('https://jsonplaceholder.typicode.com/todos/' + todoOnUpdate.id, 
      // {completed: !todoOnUpdate.completed})
      //   .subscribe((updatedTodo: Todo) => {
      //     this.todoList = this.todoList.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo);
      //     this.complite = this.todoList.filter(todo => (todo.completed === true)).length;
      //     this.noComplite = this.todoList.filter(todo => (todo.completed === false)).length;
      //   })
      const updatedTodo = {
        userId: todoOnUpdate.userId,
        id: todoOnUpdate.id,
        title: todoOnUpdate.title,
        completed: !todoOnUpdate.completed
      }
      this.todoList = this.todoList.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo);
      this.complite = this.todoList.filter(todo => (todo.completed === true)).length;
      this.noComplite = this.todoList.filter(todo => (todo.completed === false)).length;
    };
  }
  