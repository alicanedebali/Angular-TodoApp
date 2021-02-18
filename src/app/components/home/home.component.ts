import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  data = {
    todo: [
      'Get to work',
      'Pick up groceries'
    ],
    do: [
      'Go home',
      'Fall asleep'
    ],
    done: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]
  };

  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      Object.keys(this.data).forEach((key: string) => {
        // @ts-ignore
        localStorage.setItem(key, JSON.stringify(this.data[key]));

      });
    }
  }

  addTodo(todo: any) {
    this.data.todo.push(todo.value);
    todo.value = '';
    localStorage.setItem('todo', JSON.stringify(this.data.todo));
  }

  setItems() {

    Object.keys(this.data).forEach((key: string) => {

      if (!localStorage.getItem(key)) {
        // @ts-ignore
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      } else {
        // @ts-ignore
        this.data[key] = JSON.parse(localStorage.getItem(key) || '');
      }
    });

  }

  deleteItems(key: string, index: number) {
    // @ts-ignore
    this.data[key].splice(index, 1);

    // @ts-ignore
    localStorage.setItem(key, JSON.stringify(this.data[key]));

    this.openSnackBar('Görev silindi', 'Kapat');
  }

}
