import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserFormComponent } from "../../PopUps@Dialogs/add-user-form/add-user-form.component";
import { UpdateUserFormComponent } from "../../PopUps@Dialogs/update-user-form/update-user-form.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { User } from '../../../model/user';




@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, AddUserFormComponent, UpdateUserFormComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {


  constructor(private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,) {

    this.loadUserRoles();
    this.loadAllUsers();
  }


  searchTerm: string = '';
  roleFilter: string = '';
  statusFilter: string = '';

  currentPage: number = 1;
  usersPerPage: number = 10;

  // Add user form
  showAddUserForm = false;

  // Update user form
  showUpdateUserForm = false;

  // selected user
  selectedUser: User | null = null;


  //user roles
  userRolesCount: { [role: string]: number } = {};
  allUsers: User[] | undefined;


  //get user roles
  private loadUserRoles() {
    this.http.get<string[]>(`http://localhost:8080/admin/dashboard/get-total-users`).subscribe(data => {
      data.forEach(item => {
        const [role, count] = item.split(':').map(s => s.trim());
        this.userRolesCount[role.toLowerCase()] = +count;
      });
      console.log(this.userRolesCount);
    });
  }


  //get total users
  getTotalUsers(): number {
    const doctor = this.userRolesCount['doctor'] || 0;
    const patient = this.userRolesCount['patient'] || 0;
    const admin = this.userRolesCount['admin'] || 0;
    const user = this.userRolesCount['user'] || 0;

    return doctor + patient + admin + user;
  }

  //get all users
  private loadAllUsers() {
    this.http.get<User[]>('http://localhost:8080/admin/manage-user/get-all').subscribe(data => {
      this.allUsers = data;
      console.log(this.allUsers);
    });
  }

  // update user
  handleUserUpdate(updatedUser: User) {
    console.log('Received updated user:', updatedUser);

    this.http.put(`http://localhost:8080/admin/manage-user/update-user`, updatedUser, { responseType: 'text' }).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.loadAllUsers();
        this.closeUpdateUserForm();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  // delete user
  handleUserDelete(user: User) {
    this.http.delete(`http://localhost:8080/admin/manage-user/delete-user/${user.userId}/${user.role}`, {
      observe: 'response'
    }).subscribe({
      next: (res) => {
        if (res.status === 200) {
          console.log('User deleted successfully:', res.body);
          this.loadAllUsers();
        } else {
          console.warn('Unexpected response status:', res.status);
        }
      },
      error: (err) => {
        if (err.status === 200) {
          console.warn('Received error but status is 200. Assuming success.');
          this.loadAllUsers();
        } else {
          console.error('Error deleting user:', err);
        }
      }
    });
  }


  // close update user form 
  closeModal() {
    this.closeUpdateUserForm();
  }


  // add user form navigation 
  openAddUserForm() {
    this.showAddUserForm = true;
  }

  closeAddUserForm() {
    this.showAddUserForm = false;
  }

  // update user form navigation
  openUpdateUserForm(user: User) {
    this.selectedUser = user;
    this.showUpdateUserForm = true;
  }

  closeUpdateUserForm() {
    this.selectedUser = null;
    this.showUpdateUserForm = false;
  }

}
