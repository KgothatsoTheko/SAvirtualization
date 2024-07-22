import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {


  goToAbout() {
  const about = document.getElementById('about-us')
    about?.scrollIntoView({behavior: 'smooth'})
  }

  goToContact() {
  const contact = document.getElementById('contact')
    contact?.scrollIntoView({behavior: 'smooth'})
  }

  goToServices() {
  const services = document.getElementById('services') 
    services?.scrollIntoView({behavior: 'smooth'})
  }


}
