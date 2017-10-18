import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { APP_REDUCERS } from './reducers/reducers';
import { TodoList } from './components/todo-list';
import { TodoInput } from './components/todo-input';
import { FilterSelect } from './components/filter-select';


@NgModule({
  declarations: [
    AppComponent,
    TodoList,
    TodoInput,
    FilterSelect
  ],
  imports: [
    FormsModule,
    BrowserModule,
    StoreModule.provideStore(APP_REDUCERS),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
