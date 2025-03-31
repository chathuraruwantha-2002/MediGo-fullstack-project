import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true
})
export class ReportsComponent {

  reportList: Report[] = [];
  doctorsNames: string[] = [];

  constructor(private http: HttpClient) {
    this.loadReports();
    this.loadAllDoctorsNames();
  }

  private loadReports(){
    this.http.get<Report[]>('http://localhost:8080/patient/report/get-all/1').subscribe(data => {
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

}
