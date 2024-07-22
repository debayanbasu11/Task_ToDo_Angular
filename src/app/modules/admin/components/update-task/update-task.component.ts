import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  id: number = this.route.snapshot.params["id"];
  updatedTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: string[] = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: string[] = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(private service: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router) {

    this.getTaskById();
    this.getUsers();

    this.updatedTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
    });
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      this.updatedTaskForm.patchValue(res);
    });
  }

  getUsers() {
    this.service.getUsers().subscribe(
      (res) => { this.listOfEmployees = res; }
    );
  }

  updateTask() {
    this.service.updateTask(this.id, this.updatedTaskForm.value).subscribe((res) => {
      if (res.id != null) {
        this.snackbar.open("Task got Updated Succssfully!", "Close", { duration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      } else {
        this.snackbar.open("Something went Wrong!", "ERROR", { duration: 5000 });
      }
    });
  }
}
