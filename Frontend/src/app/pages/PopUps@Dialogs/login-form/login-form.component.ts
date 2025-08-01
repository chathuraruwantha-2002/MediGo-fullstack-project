import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService // inject the shared service
  ) { }

  login() {
    this.errorMsg = ''; // clear old errors

    const url = `http://localhost:8080/user/login-user?username=${this.username}&password=${this.password}`;

    this.http.get<string[]>(url).subscribe({
      next: (response) => {
        console.log(response);

        const role = response[0]?.toLowerCase();
        const userId = response[1];
        const parsedUserId = Number(userId);

        if (isNaN(parsedUserId)) {
          this.errorMsg = 'Invalid user ID received from server.';
          return;
        }

        this.userService.setUserId(parsedUserId);

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'doctor') {
          this.router.navigate(['/doctor']);
        } else if (role === 'patient') {
          this.router.navigate(['/patient']);
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
