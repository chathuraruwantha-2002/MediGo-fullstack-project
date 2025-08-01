import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'] // use "styleUrls" not "styleUrl"
})
export class LoginFormComponent {

  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const url = `http://localhost:8080/user/login-user?username=${this.username}&password=${this.password}`;

    this.http.get<string[]>(url).subscribe({
      next: (response) => {
        console.log(response);

        const role = response[0]?.toLowerCase();
        const userId = response[1];

        if (role === 'admin') {
          this.router.navigate(['/admin'], { queryParams: { id: userId } });
        } else if (role === 'doctor') {
          this.router.navigate(['/doctor'], { queryParams: { id: userId } });
        } else if (role === 'patient') {
          this.router.navigate(['/patient'], { queryParams: { id: userId } });
        } else {
          this.errorMsg = 'Unknown role!';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Invalid credentials!';
      }
    });
  }
}
