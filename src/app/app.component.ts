import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'FlexiBiller';

  constructor(private router: Router) {
    const billInfo = sessionStorage.getItem('BillInfo');

    // If billInfo is null, navigate to the root route
    if (billInfo === null) {
      this.router.navigateByUrl('/');
    } else {
      let bill;

      try {
        // Attempt to parse billInfo
        bill = JSON.parse(billInfo);
      } catch (error) {
        // If parsing billInfo fails, navigate to the root route
        this.router.navigateByUrl('/');
        return; // Exit the constructor after navigation
      }

      // Subscribe to router events
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Check if accessDenied is 'true' and navigate to access-denied if true
          if (bill.accessDenied === 'true') {
            this.router.navigateByUrl('/access-denied');
          }
        }
      });
    }
  }
}