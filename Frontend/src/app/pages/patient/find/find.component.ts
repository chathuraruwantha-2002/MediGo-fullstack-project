import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../../../model/doctor';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../../model/hospital';
import { AppointmentFormComponent } from "../../PopUps@Dialogs/appointment-form/appointment-form.component";
import { Form, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent, FormsModule],
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  static hideAppointmentForm() {
    throw new Error('Method not implemented.');
  }

  @ViewChild(AppointmentFormComponent)
  appointmentFormComponent!: AppointmentFormComponent;

  doctorList: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  hospitalList: Hospital[] = [];

  selectedDoctor: Doctor | null = null;
  isAppointmentFormVisible = false;

  // Search filter object
  searchCriteria = {
    name: '',
    specialization: '',
    hospital: '',
    date: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllHospitals();
  }

  getAllDoctors(): void {
    this.http.get<Doctor[]>('http://localhost:8080/patient/doctor/get-all-doctors').subscribe(data => {
      this.doctorList = data;
      this.filteredDoctors = data; // Initially show all
    });
  }

  private getAllHospitals(): void {
    this.http.get<Hospital[]>('http://localhost:8080/patient/doctor/get-all-hospitals').subscribe(data => {
      this.hospitalList = data;
    });
  }

  getHospitalName(hospitalId: number): string {
    const hospital = this.hospitalList.find(h => h.hospitalId === hospitalId);
    return hospital ? hospital.name : 'Unknown Hospital';
  }

  getHospitalNameById(value: string): string {
    const hospital = this.hospitalList.find(h =>
      h.name.toLowerCase().includes(value.toLowerCase()) ||
      h.hospitalId.toString() === value
    );
    return hospital ? hospital.name : '';
  }

  formatAvailability(availability: string): string {
    return availability ? availability.replace(/,/g, '&nbsp;&nbsp;') : '';
  }

  showAppointmentForm(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.isAppointmentFormVisible = true;

    setTimeout(() => {
      if (this.appointmentFormComponent) {
        this.appointmentFormComponent.setDoctor(doctor);
      }
    });
  }

  hideAppointmentForm(): void {
    this.isAppointmentFormVisible = false;
    this.selectedDoctor = null;
  }

  onSearch(): void {
    const { name, specialization, hospital, date } = this.searchCriteria;

    this.filteredDoctors = this.doctorList.filter(doctor => {
      const matchesName = name ? doctor.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesSpecialization = specialization ? doctor.specialization === specialization : true;
      const matchesHospital = hospital ? this.getHospitalName(doctor.hospitalId) === this.getHospitalNameById(hospital) : true;
      const matchesDate = date ? doctor.availability?.includes(date) : true;

      return matchesName && matchesSpecialization && matchesHospital && matchesDate;
    });
  }
}
