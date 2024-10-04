import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss',
})
export class CompletedTasksComponent {
  newTask = '';
  taskList: any[] = [];
  todoService = inject(TodoService);

  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    const result = this.todoService.getTodos();
    this.taskList = result.filter((x: any) => x.completed == true);
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
