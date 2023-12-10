import { Component, Inject } from '@angular/core';
import { BankAccount } from 'src/app/models/bankAccount.model';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestLoan } from 'src/app/models/requestLoan.model';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { RequestLoanUpdateReq } from 'src/app/dtos/RequestLoanUpdateReq.dto';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-update-request-loan',
  templateUrl: './update.request.loan.html',
  styleUrls: ['./update.request.loan.css']
})

export class UpdateRequestLoan{
  nameUser = localStorage.getItem("NAME_USER")
  idUser = localStorage.getItem("ID_USER")

  dailyRate = Math.pow((1+0.2), (1/30))-1

  start: string = this.data.loanStartDate!.toString()
  end: string = this.data.loanEndDate!.toString()
  
  days = Math.floor((new Date(this.end).getTime() - new Date(this.start).getTime()) / (1000*60*60*24))
  interest = (this.data.requestedAmount! * ((Math.pow((1+this.dailyRate), this.days))-1)).toFixed(2)

  dailyQuota = ((Number(this.data.requestedAmount) + Number(this.interest)) / this.days).toFixed(2)
  
 requestLoanUpdateReq: RequestLoanUpdateReq = {
  id: this.data.id,
  idUserUpdate: new User(),
  days: this.days,
  dailyQuota: Number(this.dailyQuota)
 }

  constructor(private matDialogRef: MatDialogRef<UpdateRequestLoan>, @Inject(MAT_DIALOG_DATA)public data: RequestLoan, private requestLoanService: RequestLoanService){
    console.log("date--> ",  this.days)
  }

  closeDialog(from: string){
    this.matDialogRef.close()
  }

  approve(){

    this.requestLoanUpdateReq.idUserUpdate!.id =  Number(this.idUser)
    
    this.requestLoanService.updateApproveStatus(this.requestLoanUpdateReq).subscribe(
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

  cancel(){
    this.requestLoanUpdateReq.idUserUpdate!.id =  Number(this.idUser)

    this.requestLoanService.updateCanceledStatus(this.requestLoanUpdateReq).subscribe(
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
