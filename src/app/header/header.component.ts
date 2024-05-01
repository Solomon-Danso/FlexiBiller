import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
declare var formattedDate: string;

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  date: string;

  constructor(private router: Router) {
    this.date = formattedDate;
  }

  ngAfterViewInit() {
    const encryptedBillInfo = sessionStorage.getItem('BillInfo');

    if (encryptedBillInfo === null) {
      console.log("Billing Information Is Empty");
    } else {
      let decryptedBillInfo;
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedBillInfo, 'SoYouWant2h@ckerh,h$h$h#@@@koko');
        decryptedBillInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
        const notificationElement = document.getElementById("notification");

        if (notificationElement) {
          if (decryptedBillInfo.daysLeft < 15) {
            notificationElement.style.backgroundColor = "goldenrod";
          } else if (decryptedBillInfo.daysLeft <5) {
            notificationElement.style.backgroundColor = "brown";
          } else if (decryptedBillInfo.daysLeft < 4) {
            notificationElement.style.backgroundColor = "darkred";
          }
          else{
            notificationElement.style.display="none";
          }
          
          notificationElement.classList.add("notification");
          notificationElement.textContent = `${decryptedBillInfo.daysLeft} days left`;
        }
        






      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }
}
