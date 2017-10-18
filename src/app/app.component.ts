import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import {TodoList} from "./components/todo-list";
import {TodoInput} from "./components/todo-input";
import {FilterSelect} from "./components/filter-select";
import {AppState, Todo, TodoModel} from "./common/interfaces";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UNDO, REDO} from './common/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public todosModel$ : Observable<TodoModel>;
	private id: number = 0;
	
	constructor(
		private _store : Store<AppState>
	){
		const todos$ = _store.select<Observable<Todo[]>>('todos');
		const visibilityFilter$ = _store.select('visibilityFilter');
		
    this.todosModel$ = Observable
    .combineLatest(
      todos$,
      visibilityFilter$,
      (t :any, visibilityFilter : any) => {
        return {
          filteredTodos: t.present.filter(visibilityFilter),
          totalTodos: t.present.length,
          completedTodos: t.present.filter((todo : Todo) => todo.complete).length
        }
      }
    );
	}
	
	addTodo(description : string){
		this._store.dispatch({type: ADD_TODO, payload: {
			id: ++this.id,
			description,
			complete: false
		}});
	}
	
	removeTodo(id : number){
		this._store.dispatch({type: REMOVE_TODO, payload: id});
	}
	
	toggleTodo(id : number){
		this._store.dispatch({type: TOGGLE_TODO, payload: id});
	}
	
	updateFilter(filter){
		this._store.dispatch({type: filter});
	}
	
	undo(){
		this._store.dispatch({type: UNDO});
	}
	
	redo(){
		this._store.dispatch({type: REDO});
	}
}