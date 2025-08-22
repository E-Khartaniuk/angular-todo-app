import { Component } from '@angular/core';
import { TodosComponent  } from './features/todos/todos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodosComponent ],
  template: `<app-todos />`,
})
export class AppComponent {}