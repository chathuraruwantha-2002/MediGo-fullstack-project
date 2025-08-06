import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Doctor } from '../../../model/doctor';
import { User } from '../../../model/user';
import { Patient } from '../../../model/patient';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  userForm!: FormGroup;
  selectedRole: string = '';
  showPassword: boolean = false;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],

      doctorInfo: this.fb.group({
        licenseNumber: [''],
        gender: [''],
        phone: [''],
        specialization: [''],
        qualification: [''],
        experience: [''],
        location: [''],
        availability: [''],
        consultationFee: [''],
        hospitalId: ['']
      }),

      patientInfo: this.fb.group({
        dateOfBirth: [''],
        gender: [''],
        phone: [''],
        bloodGroup: [''],
        allergies: [''],
        address: [''],
        medicalHistory: ['']
      }),

      //groups for nurse and admin
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
    this.selectedRole = this.userForm.get('role')?.value || '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    console.log(this.userForm.get('email')?.value);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.userForm.value;
    const user = this.buildUserFromForm(formValue);


    this.http.post('http://localhost:8080/admin/manage-user/add-user', user, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        console.log('User saved successfully');

        setTimeout(() => {
          this.getUserIdAndSaveRoleData(formValue);
        }, 1000);
      },
      error: () => this.handleError()
    });
  }

  getUserIdAndSaveRoleData(formValue: any): void {
    const email = this.userForm.get('email')?.value;
    if (!email) {
      console.error('Email is required to look up user ID.');
      return;
    }

    const encodedEmail = encodeURIComponent(email);

    this.http.get<User>(`http://localhost:8080/admin/manage-user/get-user-by-email/${encodedEmail}`).subscribe({
      next: (user) => {
        const userId = user.userId;
        if (!userId) {
          console.error('User ID is missing in response.');
          return;
        }

        switch (formValue.role) {
          case 'doctor':
            this.submitDoctor(userId, formValue);
            break;
          case 'patient':
            console.log('Submitting patient with userId:', userId);
            this.submitPatient(userId, formValue);
            break;
          case 'nurse':

            console.log('Nurse role selected - implement nurse submission if required');
            this.finalizeSubmit();
            break;
          case 'admin':

            console.log('Admin role selected - implement admin submission if required');
            this.finalizeSubmit();
            break;
          default:
            this.finalizeSubmit();
        }
      },
      error: (err) => {
        console.error('User lookup failed:', err);
        alert('Could not retrieve user by email. Please make sure the user was created.');
      }
    });
  }

  buildUserFromForm(formValue: any): User {
    return new User(
      0,
      formValue.name,
      formValue.email,
      formValue.password,
      formValue.role
    );
  }

  buildDoctorFromForm(formValue: any, userId: number): Doctor {
    const doctorInfo = formValue.doctorInfo;

    return new Doctor(
      0,
      formValue.name,
      doctorInfo.gender || 'MALE',
      doctorInfo.phone || '0000000000',
      formValue.email,
      doctorInfo.specialization || 'General',
      doctorInfo.qualification || 'MBBS',
      doctorInfo.experience || '1 year',
      doctorInfo.location || 'City',
      doctorInfo.availability || 'Available',
      doctorInfo.consultationFee || 1000,
      userId,
      doctorInfo.hospitalId || 1
    );
  }

  buildPatientFromForm(formValue: any, userId: number): Patient {
    const patientInfo = formValue.patientInfo;

    return new Patient(
      0,
      formValue.name,
      patientInfo.gender || 'MALE',
      patientInfo.phone || '0000000000',
      patientInfo.dateOfBirth || '2000-01-01',
      patientInfo.address || 'Default Address',
      patientInfo.bloodGroup || 'O+',
      patientInfo.medicalHistory || 'No medical history',
      patientInfo.allergies || 'None',
      userId
    );
  }

  submitDoctor(userId: number, formValue: any): void {
    const doctor = this.buildDoctorFromForm(formValue, userId);
    console.log('Submitting doctor:', doctor);

    this.http.post('http://localhost:8080/admin/manage-user/add-doctor', doctor, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        console.log('Doctor saved successfully');
        this.finalizeSubmit();
      },
      error: () => this.handleError()
    });
  }

  submitPatient(userId: number, formValue: any): void {
    const patient = this.buildPatientFromForm(formValue, userId);
    console.log('Submitting patient object:', patient.userId);

    this.http.post('http://localhost:8080/admin/manage-user/add-patient', patient, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        console.log('Patient saved successfully');
        this.finalizeSubmit();
      },
      error: () => this.handleError()
    });
  }

  finalizeSubmit(): void {
    console.log('User and role-specific data submitted successfully.');
    this.isSubmitting = false;
    this.userForm.reset();
    this.selectedRole = '';
    this.closeModalEvent.emit();
    alert('User saved successfully!');
  }

  handleError(): void {
    console.error('Something went wrong while submitting data.');
    this.isSubmitting = false;
    alert('Error saving user. Please try again.');
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      this.userForm.reset();
      this.selectedRole = '';
      this.closeModalEvent.emit();
    }
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
}