import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayReq } from 'src/app/dtos/PayReq.dto';
import { Pay } from 'src/app/models/pay.model';
import { User } from 'src/app/models/user.model';
import { PayService } from 'src/app/services/pay.service';



@Component({
  selector: 'app-detail-pay',
  templateUrl: './detail.pay.html',
  styleUrls: ['./detail.pay.css']
})
export class DetailPay {

  dueDate: string = this.data.dueDate!.toString()

  amount = this.data.amount!
  dailyRate = Math.pow((1+0.2), (1/30))-1
  daysLate = Math.floor((new Date("2023-12-30").getTime() - new Date(this.dueDate).getTime()) / (1000*60*60*24)) <= 0 ? 0 : Math.floor((new Date("2023-12-30").getTime() - new Date(this.dueDate).getTime()) / (1000*60*60*24))

  arrear = (this.data.state === "PENDING") ? (this.amount * ((Math.pow((1 + this.dailyRate), this.daysLate)) - 1)).toFixed(2) : this.data.arrear
  
  totalToPay = (Number(this.amount )+ Number(this.arrear)).toFixed(2)

  payReq: PayReq = {
    amountToPay: (this.data.state === "PARTIAL") ? this.data.remainingPartial : Number(this.totalToPay)
  }

  user: User = {
    id: Number(localStorage.getItem("ID_USER"))
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pay, private matDialogRef: MatDialogRef<DetailPay>, private payService: PayService){
    //console.log("ARREAR_TEST ---> ", (150 * ((Math.pow((1 + 0.006096), 5)) - 1)).toFixed(2))
    //console.log("DAYS_LATE ---> ", this.daysLate)
  }

  closeDialog(from: string){
    this.matDialogRef.close()
  }

  update(){
    this.payReq.id = this.data.id
    this.payReq.state = this.data.state
    this.payReq.amount = this.amount
    this.payReq.arrear = Number(this.arrear)
    this.payReq.remainingPartial = this.data.remainingPartial
    this.payReq.idUserUpdate = this.user

    console.log("AMOUNT TO PAY -> ", this.payReq.amountToPay)
    

    this.payService.updateState(this.payReq).subscribe(
      res => {
        if(res.error){
          alert(res.message)

          return
        }

        alert(res.message)
        window.location.reload()
      }
    )

  }

}
