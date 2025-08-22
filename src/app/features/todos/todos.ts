import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TodoService } from '../../core/services/todo';
import { Task } from '../../core/models/task';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todos.html',
  styleUrls: ['./todos.scss'],
})
export class TodosComponent implements OnInit {
  form!: FormGroup;
constructor(public todo: TodoService, private fb: FormBuilder) {}

ngOnInit(): void {
  this.form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    priority: ['medium' as Task['priority']],
  });
  this.todo.load();
}

  submit() {
    if (this.form.invalid) return;
    const { title, priority } = this.form.value as { title: string; priority: Task['priority'] };
    this.todo.addTask(title, priority);
    this.form.reset({ title: '', priority: 'medium' });
  }

  edit(task: Task) {
    const title = prompt('New task name', task.title)?.trim();
    if (title && title !== task.title) {
      this.todo.updateTask(task.id, { title });
    }
  }

  changePriority(task: Task, e: Event) {
    const priority = (e.target as HTMLSelectElement).value as Task['priority'];
    this.todo.updateTask(task.id, { priority });
  }

  setSort(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.todo.sort.set(value as any);  
}

  trackById = (_: number, t: Task) => t.id;
}