import { Component } from '@angular/core';
declare var formattedDate: string;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  date: string;

constructor(){
 this.date = formattedDate

}
}
