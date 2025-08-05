import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../model/user';

@Component({
  selector: 'app-update-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.css'
})
export class UpdateUserFormComponent implements OnChanges {
  updateUserForm: FormGroup;
  showPassword: boolean = false;

  @Input() showModal: boolean = false;
  @Input() selectedUser: User | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() updateUserEvent = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
    this.updateUserForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.updateUserForm.patchValue({
      fullName: this.selectedUser?.name || '',
      email: this.selectedUser?.email || '',
      password: this.selectedUser?.password || ''
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.updateUserForm.valid && this.selectedUser) {
      const formData = this.updateUserForm.value;

      const updatedUser: User = {
        ...this.selectedUser,
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      this.updateUserEvent.emit(updatedUser);
      alert('User updated successfully!');
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.updateUserForm.reset();
    this.loadUserData();
    this.closeModalEvent.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.updateUserForm.controls).forEach(key => {
      const control = this.updateUserForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easier access
  get fullName() { return this.updateUserForm.get('fullName'); }
  get email() { return this.updateUserForm.get('email'); }
  get password() { return this.updateUserForm.get('password'); }
}
