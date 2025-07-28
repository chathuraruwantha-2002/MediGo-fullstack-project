import { Component, EventEmitter, Output } from '@angular/core';
import { Doctor } from '../../../model/doctor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  imports: [FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {

   @Output() formSubmitted = new EventEmitter<void>();
   doctor!: Doctor;

  // Object to capture user inputs
  appointmentData = {
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    reasonVisit: '',
    newPatient: false,
    termsAgree: false
  };

  // Method to set doctor info
  setDoctor(doctor1: Doctor) {
    this.doctor = doctor1;
    console.log("Doctor set via method:", this.doctor);
  }

  // Form submit handler
  onSubmit() {
    console.log("Appointment submitted:");
    console.log(this.appointmentData);
     this.formSubmitted.emit();
  }

  

}
