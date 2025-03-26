import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appointment } from '../../model/appointment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  appointments: appointment[] = [];
  doctorsNames: string[] = [];

  constructor(private http: HttpClient) {
    this.loadAllAppointments();
  }


  private loadAllAppointments() {
    this.http.get<appointment[]>('http://localhost:8080/patient/appointment/get-all/2').subscribe(data => {
      console.log(data);
      this.appointments = data;
      this.loadAllDoctorsNames();
    });
  }

  private loadAllDoctorsNames() {
    this.http.get<string[]>('http://localhost:8080/patient/appointment/get-all-doctors').subscribe(data => {
      console.log(data);
      this.doctorsNames = data;
    });
  }

}
