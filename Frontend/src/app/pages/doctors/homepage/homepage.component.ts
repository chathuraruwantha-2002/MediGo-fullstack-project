import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';
import { Doctor } from '../../../model/doctor';
import { User } from '../../../model/user';
import { DoctorStat } from '../../../model/doctorStats';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements AfterViewInit, OnInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  LineChart: any;

  doctor: Doctor | undefined;
  user: User | undefined;
  doctorStats: DoctorStat | undefined;

  message: string = '';
  doctorId!: number;

  // Dummy monthly data
  monthlyStats = [
    { month: 'January', earnings: 82000, appointments: 45, rating: 4.3 },
    { month: 'February', earnings: 76000, appointments: 38, rating: 4.0 },
    { month: 'March', earnings: 91000, appointments: 50, rating: 4.5 },
    { month: 'April', earnings: 88000, appointments: 47, rating: 4.2 },
    { month: 'May', earnings: 95000, appointments: 53, rating: 4.6 },
    { month: 'June', earnings: 102000, appointments: 59, rating: 4.8 },
    { month: 'July', earnings: 99000, appointments: 54, rating: 4.7 },
    { month: 'August', earnings: 104000, appointments: 61, rating: 4.9 },
    { month: 'September', earnings: 97000, appointments: 49, rating: 4.4 },
    { month: 'October', earnings: 110000, appointments: 63, rating: 4.8 },
    { month: 'November', earnings: 115000, appointments: 66, rating: 4.9 },
    { month: 'December', earnings: 108000, appointments: 58, rating: 4.7 }
  ];

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.userService.getUserId();
    if (!id) {
      console.warn('No doctor ID found. Redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    this.doctorId = +id;

    // Load everything
    this.loadDoctorData();
    this.loadUserData();
    this.loadDoctorStats();
  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  // Send message and route
  send() {
    if (this.message.trim()) {
      this.sharedService.setMessage(this.message);
      console.log('Message sent:', this.message);
      this.message = '';
      this.router.navigate(['/doctors/services']);
    }
  }

  private loadUserData() {
    this.http.get<User>(`http://localhost:8080/doctor/dashboard/get-user/${this.doctorId}`).subscribe(data => {
      console.log('User data:', data);
      this.user = data;
    });
  }

  private loadDoctorData() {
    this.http.get<Doctor>(`http://localhost:8080/doctor/dashboard/get-user-info/${this.doctorId}`).subscribe(data => {
      console.log('Doctor data:', data);
      this.doctor = data;
    });
  }

  private loadDoctorStats() {
    this.http.get<DoctorStat>(`http://localhost:8080/doctor/dashboard/get-doctor-stats/${this.doctorId}`).subscribe(data => {
      console.log('Doctor stats:', data);
      this.doctorStats = data;
    });
  }

  private createLineChart() {
    const labels = this.monthlyStats.map(d => d.month);
    const earningsData = this.monthlyStats.map(d => d.earnings);
    const appointmentsData = this.monthlyStats.map(d => d.appointments);
    const ratingsData = this.monthlyStats.map(d => d.rating);

    this.LineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Earnings (LKR)',
            data: earningsData,
            borderColor: 'rgba(78, 115, 223, 1)',
            backgroundColor: 'rgba(78, 115, 223, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
            yAxisID: 'y1'
          },
          {
            label: 'Appointments',
            data: appointmentsData,
            borderColor: 'rgba(28, 200, 138, 1)',
            backgroundColor: 'rgba(28, 200, 138, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
            yAxisID: 'y2'
          },
          {
            label: 'Ratings',
            data: ratingsData,
            borderColor: 'rgba(246, 194, 62, 1)',
            backgroundColor: 'rgba(246, 194, 62, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
            text: 'Monthly Stats',
            font: { size: 15 }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            grid: { drawOnChartArea: false }
          },
          y2: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            min: 0,
            max: 70,
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }
}
