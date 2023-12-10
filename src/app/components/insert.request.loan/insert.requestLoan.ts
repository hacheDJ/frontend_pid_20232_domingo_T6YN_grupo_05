import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestLoanRegisterReq } from 'src/app/dtos/RequestLoanRegisterReq.dto';
import { LoanCategory } from 'src/app/models/loanCategory.model';
import { User } from 'src/app/models/user.model';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UtilService } from 'src/app/services/util.service';
import { InsertBankAccount } from '../insert.bank.account/insert.bank.account';


@Component({
  selector: 'app-insert-request-loan',
  templateUrl: './insert.requestLoan.html',
  styleUrls: ['./insert.requestLoan.css']
})

export class InsertRequestLoan{
  
  lstLoanCategory: LoanCategory[] = []
  objUser: User = {}
  myForm: FormGroup
  now: string
  nameUser = localStorage.getItem("NAME_USER")
  requestLoanRegisterReq: RequestLoanRegisterReq = {
    detail: "",
    requestedAmount: 0.00,
    loanStartDate: null,
    days: 0,
	  idLoanCat: {
      id: -1
    }
  }

  constructor(private utilService: UtilService, private requestLoanService: RequestLoanService, private formBuilder: FormBuilder, private matDialog: MatDialog){
    this.myForm = formBuilder.group({
      detail: "",
      requestedAmount: 0.00,
      interest: 0.00,
      loanStartDate: null,
      days: 0,
	    idLoanCat: -1,
      numberAccount: ""
    })
    
    this.now = this.currentDateFormatted()

    this.utilService.listLoanCategories().subscribe(res => this.lstLoanCategory = res)
    
    this.objUser.id = parseInt(localStorage.getItem("ID_USER")!)
    console.log("----> objUser ", this.objUser);
    
  }

  currentDateFormatted(): string{
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    //console.log(`DATE----> ${year}-${month}-${day}`);
    
    return `${year}-${month}-${day}`
  }

  insert(){
    this.requestLoanRegisterReq.idBorrower = this.objUser
    this.requestLoanRegisterReq.idUserRegister = this.objUser
    this.requestLoanRegisterReq.idUserUpdate = this.objUser
    console.log("requestLoanRegisterReq -----> ", this.requestLoanRegisterReq);
    
    this.requestLoanService.insert(this.requestLoanRegisterReq).subscribe(
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

  onInputChange(event: Event){
    let reqAmo = this.myForm.get("requestedAmount")?.value
    let dailyRate = Math.pow((1+0.2), (1/30))-1
    let days = this.myForm.get("days")?.value
    let interest = reqAmo * ((Math.pow((1+dailyRate), days))-1)

    this.myForm.get("interest")?.setValue(interest.toFixed(2))
  }


  showDialog(){
    const dialogRef = this.matDialog.open(InsertBankAccount, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.myForm.get("numberAccount")?.setValue(result)
      console.log("RESULT ", result);
      
    });
  }

  
}
