import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];
  searchForm: FormGroup;

  constructor(private service: AdminService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder) {
    this.getTasks();
    this.searchForm = this.fb.group({
      title: [null]
    });
  }

  getTasks() {
    this.service.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  deleteTask(taskId: number) {
    this.service.deleteTask(taskId).subscribe((res) => {
      this.snackbar.open("Task has been deleted successfully!", "Close", { duration: 5000 });
      this.getTasks();
    });
  }

  searchTask() {
    this.listOfTasks = [];
    const title = this.searchForm.get('title')!.value;
    this.service.searchTask(title).subscribe((res) => {
      this.listOfTasks = res;
    });
  }
}
