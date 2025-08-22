import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private _tasks = signal<Task[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');
  sort   = signal<'none' | 'priority-asc' | 'priority-desc'>('none');

  readonly tasks = this._tasks.asReadonly();

  readonly visibleTasks = computed(() => {
    const f = this.filter();
    const s = this.sort();
    let list = this._tasks();

    if (f === 'active') list = list.filter(t => !t.completed);
    if (f === 'completed') list = list.filter(t => t.completed);

    const order = { low: 1, medium: 2, high: 3 } as const;
    if (s === 'priority-asc')  list = [...list].sort((a,b)=> order[a.priority]-order[b.priority]);
    if (s === 'priority-desc') list = [...list].sort((a,b)=> order[b.priority]-order[a.priority]);

    return list;
  });

  constructor(private http: HttpClient) {}

  /** Loading from API */
  load() {
    this.http.get<any[]>(`${this.apiUrl}?_limit=10`).subscribe(data => {
       
      const tasks: Task[] = data.map(t => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        priority: 'medium'  
      }));
      this._tasks.set(tasks);
    });
  }

  addTask(title: string, priority: Task['priority']) {
    const newTask = { title, completed: false, priority, userId: 1 };

    this.http.post<any>(this.apiUrl, newTask).subscribe(created => {
      this._tasks.update(list => [
        { ...created, id: Date.now(), priority },  
        ...list
      ]);
    });
  }

  toggleCompleted(id: number) {
    const current = this._tasks().find(t => t.id === id);
    
    if (!current) return;

    this.http.patch<any>(`${this.apiUrl}/${id}`, { completed: !current.completed })
      .subscribe(() => {
        this._tasks.update(list => list.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
      });
  }

  updateTask(id: number, patch: Partial<Task>) {
    this.http.patch<any>(`${this.apiUrl}/${id}`, patch).subscribe(() => {
      this._tasks.update(list => list.map(t =>
        t.id === id ? { ...t, ...patch } : t
      ));
    });
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this._tasks.update(list => list.filter(t => t.id !== id));
    });
  }
}
