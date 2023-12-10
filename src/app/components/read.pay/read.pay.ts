import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pay } from 'src/app/models/pay.model';
import { PayService } from 'src/app/services/pay.service';


@Component({
  selector: 'app-read-pay',
  templateUrl: './read.pay.html',
  styleUrls: ['./read.pay.css']
})
export class ReadPay {

  lstPay: Pay[] = []

  idUser = Number(localStorage.getItem("ID_USER"))
  idPortfolio = Number(localStorage.getItem("ID_PORTFOLIO"))

  pageSize = 5
  page = 1
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private payService: PayService, private matDialogRef: MatDialogRef<ReadPay>){
    this.payService.listByIdLoan(this.data).subscribe(res => this.lstPay = res)
  }

  closeModal(from: string){
    this.matDialogRef.close()
  }
 


}
