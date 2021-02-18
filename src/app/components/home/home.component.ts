import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TodoService} from '../../services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  data = {
    pendings: [
      {id: 0, todo: ''}
    ],
    inProgress: [
      {id: 0, todo: ''}
    ],
    done: [
      {id: 0, todo: ''}
    ]
  };

  constructor(private _snackBar: MatSnackBar, private todoService: TodoService) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    // this.setItems();
    this.getAllTodo();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateItems(this.data);
    }
  }

  addTodo(todo: any) {
    const obj = {todo: todo.value};
    this.todoService.addTodo(obj)
      .subscribe((res) => {
          console.log(res);
          this.getAllTodo();
        },
        (error) => {
          console.log(error);
        });
  }

  getAllTodo() {
    this.todoService.getAllTodo()
      .subscribe((res) => {
          Object.keys(res).forEach((key) => {
            // @ts-ignore
            this.data[key] = res[key];
          });

        },
        (error) => {
          console.log(error);
        });
  }

  updateItems(obj: any) {

    this.todoService.updateTodo(obj)
      .subscribe((res) => {
          console.log(res);
          this.getAllTodo();
        },
        (error) => {
          console.log(error);
        });

  }

  deleteItems(index: number) {

    this.todoService.removeTodo(index)
      .subscribe((res) => {
          console.log(res);
          this.getAllTodo();
          this.openSnackBar('iş parçacığı silindi', 'Kapat');
        },
        (error) => {
          console.log(error);
        });
  }

}
