import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../../../model/doctor';

@Component({
  selector: 'app-appointment-form',
  imports: [FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {

   @Output() formSubmitted = new EventEmitter<void>();
   doctor!: Doctor;


   constructor(private http: HttpClient) {
     }

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


saveAppointment() {
  const data = this.appointmentData;

  // Validate fields
  if (
    data.patientName?.trim() &&
    data.patientEmail?.trim() &&
    data.patientPhone?.trim() &&
    data.appointmentDate &&
    data.appointmentTime &&
    data.reasonVisit?.trim() &&
    data.termsAgree &&
    this.doctor
  ) {

    // new appointment object
    const newAppointment = {
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      location: 'Online',
      reasonVisit: data.reasonVisit,
      status: 0,
      dateTimeStats: new Date().toISOString(),
      patientId: 1,
      doctorId: this.doctor.doctorId
    };

    
    this.http.post('http://localhost:8080/patient/appointment/add-appointment', newAppointment, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        console.log('Appointment saved successfully:', res);
        alert('Appointment added successfully!');
      },
      error: (err) => {
        console.error('Error saving appointment:', err);
        alert('Failed to save appointment!');
      }
    });

  } else {
    console.warn('Fill in all required fields before saving the appointment!');
    alert('Please complete all required fields.');
  }
}



// Method to clear form
resetForm() {
  this.appointmentData = {
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    reasonVisit: '',
    newPatient: false,
    termsAgree: false
  };
}


  // Method to set doctor info
  setDoctor(doctor: Doctor) {
    this.doctor = doctor;
    console.log("Doctor set via method:", this.doctor);
  }

  // Form submit handler
  onSubmit() {
    console.log("Appointment submitted:");
    console.log(this.appointmentData);
    this.saveAppointment();
    this.resetForm();
     this.formSubmitted.emit();
  }



  

}
