import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../model/Report';
import { Component } from '@angular/core';
import { Prescription } from '../../model/Prescription';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";

@Component({
  selector: 'app-reports',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true
})
export class ReportsComponent {

  reportList: Report[] = [];
  prescriptionList: Prescription[] = [];
  doctorsNames: string[] = [];

  constructor(private http: HttpClient) {
    this.loadReports();
    this.loadPrescriptions();
    this.loadAllDoctorsNames();
  }

  private loadReports(){
    this.http.get<Report[]>('http://localhost:8080/patient/report/get-all-reports/1').subscribe(data => {
      this.reportList = data;
      console.log(data);
    })
  }

  public loadAllDoctorsNames() {
    this.http.get<string[]>('http://localhost:8080/patient/appointment/get-all-doctors').subscribe(data => {
      console.log(data);
      this.doctorsNames = data;
    });
  }

  private loadPrescriptions(){
    this.http.get<Prescription[]>('http://localhost:8080/patient/report/get-all-prescriptions/1').subscribe(data => {
      this.prescriptionList = data;
      console.log(data);
    })
  }

}
