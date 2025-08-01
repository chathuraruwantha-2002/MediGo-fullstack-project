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
      const userId = Number(response[1]);

      if (isNaN(userId)) {
        this.errorMsg = 'Invalid user ID received from server.';
        return;
      }

      this.userService.setUserId(userId); // Store user ID

      // Define a base path for account fetch
      let accountUrl = '';

      // Define redirect path
      let redirectPath = '';

      if (role === 'admin') {
        redirectPath = '/admin';
        this.router.navigate([redirectPath]);
        return; // admin has no accountId
      } else if (role === 'doctor') {
        accountUrl = `http://localhost:8080/user/get-doctor-id/${userId}`;
        redirectPath = '/doctor';
      } else if (role === 'patient') {
        accountUrl = `http://localhost:8080/user/get-patient-id/${userId}`;
        redirectPath = '/patient';
      } else {
        this.errorMsg = 'Unknown role!';
        return;
      }

      // Now fetch the account ID (for doctor or patient)
      this.http.get<number>(accountUrl).subscribe({
        next: (accId) => {
          console.log("Account ID:", accId);
          this.userService.setAccountId(accId); // Save acc ID
          this.router.navigate([redirectPath]); // Navigate
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Could not retrieve account ID.';
        }
      });
    },
    error: (err) => {
      console.error(err);
      this.errorMsg = 'Invalid credentials!';
    }
  });
}


}
