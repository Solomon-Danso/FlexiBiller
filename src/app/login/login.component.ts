import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) {}


 

  login() {
    // Retrieve input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

   



    if (username === 'JAdade@gmail.com' && password === 'Password1') {

      const BillInfo = {
        shortName:"crccu",
        isLoggedIn: "1",
        isInvoiceSent: "1",
        accessDenied:"true",
       }
       
       const encryptedBillInfo = CryptoJS.AES.encrypt(JSON.stringify(BillInfo), 'SoYouWant2h@ckerh,h$h$h#@@@koko').toString();

 
    sessionStorage.setItem("BillInfo", encryptedBillInfo);


      if(BillInfo.accessDenied==="true") {
        this.router.navigate(['/access-denied']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }






      


    } else {
      // Handle incorrect credentials
      alert('Invalid username or password');
    }


  }





}
