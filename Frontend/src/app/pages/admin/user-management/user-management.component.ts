import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserFormComponent } from "../../PopUps@Dialogs/add-user-form/add-user-form.component";
import { UpdateUserFormComponent } from "../../PopUps@Dialogs/update-user-form/update-user-form.component";


interface User {
  id: number;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, AddUserFormComponent, UpdateUserFormComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {
  // =================== Properties ===================
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'doctor', status: 'active', lastLogin: '2025-08-01', joinDate: '2024-12-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'patient', status: 'pending', lastLogin: '2025-07-30', joinDate: '2025-01-15' },
    { id: 3, name: 'Admin One', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2025-08-03', joinDate: '2024-11-01' },
  ];

  filteredUsers: User[] = [...this.users];
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

  // =================== Getters ===================
  get totalUsers(): number {
    return this.users.length;
  }

  get totalDoctors(): number {
    return this.users.filter(user => user.role === 'doctor').length;
  }

  get totalPatients(): number {
    return this.users.filter(user => user.role === 'patient').length;
  }

  get totalAdmins(): number {
    return this.users.filter(user => user.role === 'admin').length;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.filteredUsers.slice(start, start + this.usersPerPage);
  }

  // =================== Methods ===================

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        !this.searchTerm ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = !this.roleFilter || user.role === this.roleFilter;
      const matchesStatus = !this.statusFilter || user.status === this.statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    this.currentPage = 1;
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addUser(): void {
    // TODO: Replace with modal or actual form
    alert('Add User button clicked');
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
