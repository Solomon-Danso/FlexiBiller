import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';


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
       
      sessionStorage.setItem("BillInfo", JSON.stringify(BillInfo))

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
