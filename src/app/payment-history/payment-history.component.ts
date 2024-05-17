import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import * as CryptoJS from 'crypto-js';




export interface PaymentHistory {
  id: number;
  instituitionName: string;
  shortName: string;
  country: string;
  currency: string;
  instituitionType: string;
  companyEmail: string;
  packageType: string;
  branches: number;
  users: number;
  databaseSize: number;
  billingType: string;
  amountPaid: number;
  paymentDate: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  displayedColumns: string[] = ['index','country','instituitionType', 'instituitionName','billingType', 'amountPaid','packageType', 'paymentDate', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<PaymentHistory>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {
    
  }


  ngOnInit() {
    this.fetchPaymentHistory();
  }
  

  fetchPaymentHistory() {
    // Retrieve and decrypt shortName from sessionStorage
   

  
    try {
      
     let decryptedBillInfo;


      const encryptedShortName = sessionStorage.getItem('BillInfo');
      if (encryptedShortName === null) {
        // Handle the case where 'ShortName' is not found in sessionStorage
        console.table(encryptedShortName)
        return;
      }
      

   
      const bytes = CryptoJS.AES.decrypt(encryptedShortName, 'SoYouWant2h@ckerh,h$h$h#@@@koko');
       decryptedBillInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

       console.log(decryptedBillInfo)

       this.http.get<PaymentHistory[]>('http://localhost:5000/api/Biller/GetPaymentHis?ShortName=' + decryptedBillInfo.shortName)
       .subscribe(data => {
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
       }, error => {
         console.error('Error fetching payment history:', error);
         // Handle error if needed
       });



    } catch (error) {
      console.error('Error decrypting shortName:', error);
      return;
    }


  }


  getIndex(index: number): number {
    return index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }
  
}
