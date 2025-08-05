import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {


  // Modal control
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();





















  userForm!: FormGroup;
  selectedRole: string = '';
  showPassword = false;
  isEditMode = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],

      doctorInfo: this.fb.group({
        licenseNumber: [''],
        specialization: ['']
      }),

      patientInfo: this.fb.group({
        dateOfBirth: [''],
        gender: [''],
        phone: [''],
        bloodGroup: [''],
        allergies: ['']
      }),

      nurseInfo: this.fb.group({
        nurseId: [''],
        department: ['']
      }),

      adminInfo: this.fb.group({
        accessLevel: [''],
        department: ['']
      })
    });
  }

  onRoleChange(): void {
    const role = this.userForm.get('role')?.value;
    this.selectedRole = role;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  getRoleBadgeClass(): string {
    switch (this.selectedRole) {
      case 'admin':
        return 'badge bg-primary';
      case 'doctor':
        return 'badge bg-success';
      case 'patient':
        return 'badge bg-warning text-dark';
      case 'nurse':
        return 'badge bg-info text-dark';
      default:
        return '';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate an API call
    setTimeout(() => {
      const formData = this.userForm.value;
      console.log('Submitted user data:', formData);

      // Reset or close form as needed
      this.isSubmitting = false;
      if (!this.isEditMode) {
        this.userForm.reset();
        this.selectedRole = '';
      }
    }, 1500);
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      this.userForm.reset();
      this.selectedRole = '';
    }
  }
}
