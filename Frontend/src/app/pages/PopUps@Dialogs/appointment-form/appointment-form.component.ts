import { Component } from '@angular/core';
import { Doctor } from '../../../model/doctor';

@Component({
  selector: 'app-appointment-form',
  imports: [],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {

  doctor!: Doctor;

  setDoctor(doctor1: Doctor) {
    this.doctor = doctor1;
    console.log("Doctor set via method:", this.doctor);
  }

}
