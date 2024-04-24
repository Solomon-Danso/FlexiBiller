import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'FlexiBiller';

  constructor(private router: Router) {
    const encryptedBillInfo = sessionStorage.getItem('BillInfo');

    // If billInfo is null, navigate to the root route
    if (encryptedBillInfo === null) {
      this.router.navigateByUrl('/');
    } else {
      let decryptedBillInfo;

      try {
        // Decrypt billInfo
        const bytes = CryptoJS.AES.decrypt(encryptedBillInfo, 'SoYouWant2h@ckerh,h$h$h#@@@koko');
        decryptedBillInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        // If decryption fails, navigate to the root route
        this.router.navigateByUrl('/');
        return; // Exit the constructor after navigation
      }

      // Subscribe to router events
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Check if accessDenied is 'true' and navigate to access-denied if true
          if (decryptedBillInfo.accessDenied === 'true') {
            this.router.navigateByUrl('/access-denied');
          }
        }
      });
    }
  }
}
