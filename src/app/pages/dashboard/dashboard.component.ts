import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <h2 class="dashboard-title">Dashboard</h2>

    <!-- Task Management Section -->
    <mat-card class="section-card">
      <mat-card-header>
        <mat-card-title>Task Management</mat-card-title>
        <button mat-raised-button color="warn" class="logout-btn" (click)="logout()">Logout</button>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="addTask()" class="task-form">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>New Task</mat-label>
            <input matInput [(ngModel)]="newTask.title" name="title" required />
          </mat-form-field>
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="newTask.status" name="status">
              <mat-option value="pending">Pending</mat-option>
              <mat-option value="completed">Completed</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" class="add-btn">Add Task</button>
        </form>
        <mat-list>
          <mat-list-item *ngFor="let task of tasks" class="task-item">
            <span>{{ task.title }} - {{ task.status }}</span>
            <div class="task-actions">
              <button mat-raised-button color="accent" (click)="editTask(task)">Edit</button>
              <button mat-raised-button color="warn" (click)="deleteTask(task.id)">Delete</button>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>

    <!-- Client Management Section -->
    <mat-card class="section-card">
      <mat-card-header>
        <mat-card-title>Client Management</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="addClient()" class="client-form">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Client Name</mat-label>
            <input matInput [(ngModel)]="newClient.name" name="name" required />
          </mat-form-field>
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="newClient.email" name="email" required />
          </mat-form-field>
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="newClient.phone" name="phone" required />
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" class="add-btn">Add Client</button>
        </form>
        <mat-list>
          <mat-list-item *ngFor="let client of clients" class="client-item">
            <span>{{ client.name }} - {{ client.email }} - {{ client.phone }}</span>
            <div class="client-actions">
              <button mat-raised-button color="accent" (click)="editClient(client)">Edit</button>
              <button mat-raised-button color="warn" (click)="deleteClient(client.id)">Delete</button>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .dashboard-title {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: #3f51b5;
      }

      mat-card {
        margin: 1.5rem auto;
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .section-card {
        max-width: 800px;
        margin: 0 auto;
      }

      .task-form,
      .client-form {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .form-field {
        flex: 1 1 calc(50% - 1rem);
        min-width: 200px;
      }

      .add-btn {
        margin-top: 1rem;
        align-self: flex-start;
      }

      mat-list {
        margin-top: 1rem;
      }

      mat-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e0e0e0;
      }

      .task-item,
      .client-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .task-actions button,
      .client-actions button {
        margin-left: 0.5rem;
      }

      .logout-btn {
        margin-left: auto;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  clients: any[] = [];
  newTask: any = { title: '', status: 'pending' };
  newClient: any = { name: '', email: '', phone: '' };
  editingTask: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
    this.fetchClients();
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe((data) => {
      this.tasks = data;
    });
  }

  fetchClients() {
    this.http.get<any[]>('http://localhost:3000/clients').subscribe((data) => {
      this.clients = data;
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) {
      console.error('Task title cannot be empty!');
      return;
    }
    this.http.post('http://localhost:3000/tasks', this.newTask).subscribe(() => {
      this.fetchTasks();
      this.newTask = { title: '', status: 'pending' };
    });
  }

  deleteTask(id: number) {
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
      this.fetchTasks();
    });
  }

  editTask(task: any) {
    this.editingTask = { ...task };
  }

  saveTask() {
    this.http.put(`http://localhost:3000/tasks/${this.editingTask.id}`, this.editingTask).subscribe(() => {
      this.fetchTasks();
      this.editingTask = null;
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  addClient() {
    if (!this.newClient.name || !this.newClient.email || !this.newClient.phone) {
      console.error('All client fields are required!');
      return;
    }
    this.http.post('http://localhost:3000/clients', this.newClient).subscribe(() => {
      this.fetchClients();
      this.newClient = { name: '', email: '', phone: '' };
    });
  }

  deleteClient(id: number) {
    this.http.delete(`http://localhost:3000/clients/${id}`).subscribe(() => {
      this.fetchClients();
    });
  }

  editClient(client: any) {
    console.log('Edit client:', client);
    // Placeholder for future editing functionality
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
