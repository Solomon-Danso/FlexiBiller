import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent {

}
