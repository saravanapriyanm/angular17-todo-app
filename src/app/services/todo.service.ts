import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {}

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  removeTodo(index: number): void {
    if (index > -1 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  }

  updateTodo(index: number, todo: Todo): void {
    if (index > -1 && index < this.todos.length) {
      this.todos[index] = todo;
    }
  }
}
