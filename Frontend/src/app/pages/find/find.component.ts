import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../../model/doctor';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../model/hospital';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";


@Component({
  selector: 'app-find',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './find.component.html',
  styleUrl: './find.component.css'
})
export class FindComponent implements OnInit {



  @ViewChild(AppointmentFormComponent)
 appointmentFormComponent!: AppointmentFormComponent;


  doctorList: Doctor[] = [];
  hospitalList: Hospital[] = [];

  selectedDoctor: Doctor | null = null;
  isAppointmentFormVisible = false;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllDoctors();
    this.getAllHospitals();
   }

   getAllDoctors() {
    this.http.get<Doctor[]>('http://localhost:8080/patient/doctor/get-all-doctors').subscribe(data => {
      this.doctorList = data;
      console.log(data);
    });
  }

  private getAllHospitals() {
    this.http.get<Hospital[]>('http://localhost:8080/patient/doctor/get-all-hospitals').subscribe(data => {
      console.log(data);
      this.hospitalList = data;
    });
  }

  getHospitalName(hospitalId: number): string {
    const hospital = this.hospitalList.find(h => h.hospitalId === hospitalId);
    return hospital ? hospital.name : 'Unknown Hospital';
  }

  formatAvailability(availability: string): string {
    return availability ? availability.replace(/,/g, '&nbsp;&nbsp;') : '';
  }


 
  showAppointmentForm(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.isAppointmentFormVisible = true;
  
    setTimeout(() => {
      if (this.appointmentFormComponent) {
        this.appointmentFormComponent.setDoctor(doctor);
      }
    });
  }
  
  hideAppointmentForm() {
    this.isAppointmentFormVisible = false;
    this.selectedDoctor = null; 
  }

  
  

}