import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  intialTaskList: any[] = [];
  taskList: any[] = [];
  stateService = inject(StateService);
  todoService = inject(TodoService);
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      console.log('search', value);
      if (value) {
        this.taskList = this.intialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.intialTaskList;
      }
    });
    this.getAllTasks();
  }
  addTask() {
    console.log('addTask', this.newTask);
    this.todoService.addTodo({ title: this.newTask, completed: false });
    this.newTask = '';
    this.getAllTasks();
  }
  getAllTasks() {
    const result = this.todoService.getTodos();
    this.intialTaskList = this.taskList = result;
  }
  onComplete({ index, task }: { index: number; task: Todo }) {
    task.completed = true;
    console.log('complete', task);
    this.todoService.updateTodo(index, task);
    this.getAllTasks();
  }
  onImportant({ index, task }: { index: number; task: Todo }) {
    task.important = true;
    this.todoService.updateTodo(index, task);
  }
}
