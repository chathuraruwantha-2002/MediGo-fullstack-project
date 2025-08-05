import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../model/user';

@Component({
  selector: 'app-update-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.css'
})
export class UpdateUserFormComponent implements OnInit {

  updateUserForm: FormGroup;
  showPassword: boolean = false;





    // Modal control
    @Input() showModal: boolean = false;
    @Output() closeModalEvent = new EventEmitter<void>()

    // User data
    @Input() selectedUser: User | null = null;








  constructor(private formBuilder: FormBuilder) {
    this.updateUserForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Pre-populate form with existing user data
    this.loadUserData();
  }

  loadUserData(): void {
    // Simulate loading user data (in real app, this would come from a service)
    const userData = {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      password: '' // Don't pre-populate password for security
    };

    this.updateUserForm.patchValue(userData);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      const formData = this.updateUserForm.value;
      console.log('Updated User Data:', formData);
      
      // Here you would typically call a service to update the user
      // this.userService.updateUser(formData).subscribe(...)
      
      alert('User updated successfully!');
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    // Reset form or navigate back
    this.updateUserForm.reset();
    this.loadUserData();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.updateUserForm.controls).forEach(key => {
      const control = this.updateUserForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access to form controls
  get fullName() { return this.updateUserForm.get('fullName'); }
  get email() { return this.updateUserForm.get('email'); }
  get password() { return this.updateUserForm.get('password'); }

}
