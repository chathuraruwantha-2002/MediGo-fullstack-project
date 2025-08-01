import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { LoginFormComponent } from "../PopUps@Dialogs/login-form/login-form.component";
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";
declare var bootstrap: any;

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, LoginFormComponent, CommonModule, AppointmentFormComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
showLogin = false;

  openLoginModal() {
    this.showLogin = true;
  }
}
