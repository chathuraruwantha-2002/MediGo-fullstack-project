import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../model/Report';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Prescription } from '../../model/Prescription';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";
import { PatientHealthData } from '../../model/patientHealthData';
import { Chart } from 'chart.js';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true
})
export class ReportsComponent implements AfterViewInit {


  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  LineChart: any;


  // Dummy data for the line chart
  healthHistory = [
    { date: '2025-07-01', systolic: 120, bmi: 22.3, sugar: 95, bloodCount: 80 },
    { date: '2025-07-08', systolic: 125, bmi: 22.6, sugar: 102, bloodCount: 85 },
    { date: '2025-07-15', systolic: 130, bmi: 23.0, sugar: 110, bloodCount: 90 },
    { date: '2025-07-22', systolic: 138, bmi: 23.2, sugar: 118, bloodCount: 95 },
    { date: '2025-07-29', systolic: 135, bmi: 23.1, sugar: 114, bloodCount: 100 }
  ];

  //data
  reportList: Report[] = [];
  prescriptionList: Prescription[] = [];
  doctorsNames: string[] = [];
  patientStats: PatientHealthData | undefined;

  //status
  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';

  //account id
  accountId: number | null = null;

  constructor(private http: HttpClient, private userService: UserService) {
    this.getAccountId();
    this.loadReports();
    this.loadPrescriptions();
    this.loadAllDoctorsNames();
    this.loadPatientHealthStats();
  }
  ngAfterViewInit(): void {
    this.createLineChart();
  }

  private getAccountId() {
    this.accountId = this.userService.getAccountId();
  }

  private loadReports() {
    this.http.get<Report[]>(`http://localhost:8080/patient/report/get-all-reports/${this.accountId}`).subscribe(data => {
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

  private loadPrescriptions() {
    this.http.get<Prescription[]>(`http://localhost:8080/patient/report/get-all-prescriptions/${this.accountId}`).subscribe(data => {
      this.prescriptionList = data;
      console.log(data);
    })
  }


  private loadPatientHealthStats() {

    this.http.get<PatientHealthData>(`http://localhost:8080/patient/dashboard/get-health-stats/${this.accountId}`).subscribe(data => {
      console.log(data);
      this.patientStats = data;

      this.displayStatusColors();
    });
  }

  private displayStatusColors() {
    if (this.patientStats?.bloodPressure != null) {
      this.statusBloodPressure =
        this.patientStats.bloodPressure >= 160 ? "High" :
          (this.patientStats.bloodPressure >= 120 ? "Normal" : "Low");
    }

    if (this.patientStats?.bloodSugar != null) {
      this.statusBloodSugar =
        this.patientStats.bloodSugar > 180 ? "High" :
          (this.patientStats.bloodSugar >= 120 ? "Normal" : "Low");
    }

    if (this.patientStats?.bmi != null) {
      this.statusBMI =
        this.patientStats.bmi >= 30 ? "High" :
          (this.patientStats.bmi >= 25 ? "Normal" : "Low");
    }

    if (this.patientStats?.heartRate != null) {
      this.statusBloodCount =
        this.patientStats.heartRate >= 100 ? "High" :
          (this.patientStats.heartRate >= 60 ? "Normal" : "Low");
    }
  }






  private createLineChart() {
    const labels = this.healthHistory.map(d => d.date);
    const systolicData = this.healthHistory.map(d => d.systolic);
    const bmiData = this.healthHistory.map(d => d.bmi);
    const sugarData = this.healthHistory.map(d => d.sugar);
    const bloodCountData = this.healthHistory.map(d => d.bloodCount);

    this.LineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Systolic Blood Pressure',
            data: systolicData,
            borderColor: 'rgba(255, 0, 55, 1)',
            backgroundColor: 'rgba(255, 99, 133, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'BMI',
            data: bmiData,
            borderColor: 'rgba(5, 125, 162, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Blood Sugar',
            data: sugarData,
            borderColor: '#0c3868',
            backgroundColor: 'rgba(54, 163, 235, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'blood count',
            data: bloodCountData,
            borderColor: '#edaa00ff',
            backgroundColor: 'rgba(54, 163, 235, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
            text: 'Health Trend',
            font: {
              size: 15
            }
          },
          legend: {
            display: false,
            position: 'top'
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            beginAtZero: true
          }
        }
      }
    });
  }






}
