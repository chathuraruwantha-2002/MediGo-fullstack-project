import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';
import { Patient } from '../../../model/patient';
import { PatientHealthData } from '../../../model/patientHealthData';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-homepage-patient',
  templateUrl: './homepage-patient.component.html',
  styleUrls: ['./homepage-patient.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomepagePatientComponent implements AfterViewInit, OnInit {

  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  LineChart: any;

  patientStats: PatientHealthData | undefined;
  patient: Patient | undefined;

  //ai mzg
  message: string = '';

  userId!: number;
  accountId!: number;

  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';

  // Dummy data for the line chart
  healthHistory = [
    { date: '2025-07-01', systolic: 120, bmi: 22.3, sugar: 95 },
    { date: '2025-07-08', systolic: 125, bmi: 22.6, sugar: 102 },
    { date: '2025-07-15', systolic: 130, bmi: 23.0, sugar: 110 },
    { date: '2025-07-22', systolic: 138, bmi: 23.2, sugar: 118 },
    { date: '2025-07-29', systolic: 135, bmi: 23.1, sugar: 114 }
  ];


  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    const accId = this.userService.getAccountId();

    if (!userId || !accId) {
      console.warn('Missing user ID or account ID. Redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    this.userId = userId;
    this.accountId = accId;

    console.log('Logged-in doctorId:', this.userId);
    console.log('Doctor accountId:', this.accountId);

    this.loadPatientHealthStats();
    this.loadPatientData();
  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  send() {
    if (this.message.trim()) {
      this.sharedService.setMessage(this.message);
      console.log('Message sent:', this.message);
      this.message = '';
      this.router.navigate(['/patient/services']);
    }
  }

  private loadPatientHealthStats() {
    this.http
      .get<PatientHealthData>(`http://localhost:8080/patient/dashboard/get-health-stats/${this.accountId}`)
      .subscribe((data) => {
        console.log('Patient stats:', data);
        this.patientStats = data;
        this.displayStatusColors();
        this.createLineChart();
      });
  }

  private displayStatusColors() {
    if (this.patientStats?.bloodPressure != null) {
      this.statusBloodPressure =
        this.patientStats.bloodPressure >= 160 ? 'High' : this.patientStats.bloodPressure >= 120 ? 'Normal' : 'Low';
    }

    if (this.patientStats?.bloodSugar != null) {
      this.statusBloodSugar =
        this.patientStats.bloodSugar > 180 ? 'High' : this.patientStats.bloodSugar >= 120 ? 'Normal' : 'Low';
    }

    if (this.patientStats?.bmi != null) {
      this.statusBMI = this.patientStats.bmi >= 30 ? 'High' : this.patientStats.bmi >= 25 ? 'Normal' : 'Low';
    }

    if (this.patientStats?.heartRate != null) {
      this.statusBloodCount =
        this.patientStats.heartRate >= 100 ? 'High' : this.patientStats.heartRate >= 60 ? 'Normal' : 'Low';
    }
  }

  private loadPatientData() {
    this.http
      .get<Patient>(`http://localhost:8080/patient/dashboard/get-user/${this.userId}`)
      .subscribe((data) => {
        console.log('Patient data:', data);
        this.patient = data;
      });
  }

  private createLineChart() {
    if (!this.lineChartRef) return;

    const labels = this.healthHistory.map((d) => d.date);
    const systolicData = this.healthHistory.map((d) => d.systolic);
    const bmiData = this.healthHistory.map((d) => d.bmi);
    const sugarData = this.healthHistory.map((d) => d.sugar);

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
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
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
