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
  isClosing = false;

  openLoginModal() {
    this.showLogin = true;
    this.isClosing = false;
  }

  startCloseAnimation() {
    this.isClosing = true;

    setTimeout(() => {
      this.showLogin = false;
      this.isClosing = false;
    }, 300);
  }

  //scroll to features
  scrollToFeatures() {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //scroll to get start
  scrollToGetStarted() {
    const el = document.getElementById('getstarted');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //scroll to contact
  scrollToContact() {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
