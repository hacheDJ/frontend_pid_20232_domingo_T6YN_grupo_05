import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestLoanSearch } from 'src/app/dtos/RequestLoanSearch.dto';
import { UserSigninRes } from 'src/app/dtos/UserSigninRes.dto';
import { Pay } from 'src/app/models/pay.model';
import { RequestLoan } from 'src/app/models/requestLoan.model';
import { PayService } from 'src/app/services/pay.service';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UserService } from 'src/app/services/user.service';
import { DetailPay } from '../detail.pay/detail.pay';
import { UpdateRequestLoan } from '../update.request.loan/update.request.loan';


@Component({
  selector: 'app-insert-pay',
  templateUrl: './insert.pay.html',
  styleUrls: ['./insert.pay.css']
})
export class InsertPay {
  lstBorrower: UserSigninRes[] = []
  lstRequestLoan: RequestLoan[] = []
  lstLoan: RequestLoan[] = []
  lstPay: Pay[] = []

  requestLoanSearch: RequestLoanSearch = {
    start: null,
    end: null
  }

  idUser = Number(localStorage.getItem("ID_USER"))
  idPortfolio = Number(localStorage.getItem("ID_PORTFOLIO"))

  pageSize = 3
  page = 1

  selectLoan: string = "-1"
  selectState: string = "-1"
  
  constructor(private userService: UserService, private requestLoanService: RequestLoanService, private matDialog: MatDialog, private payService: PayService){
    this.userService.listByIdPortfolio(this.idPortfolio).subscribe(res => this.lstBorrower = res)
    this.requestLoanService.listByLender(this.idPortfolio).subscribe(res => this.lstRequestLoan = res)
    
  }

  onSelectChange1(event: any){
    this.selectLoan = "-1"
    let id = event.target.value

    if(id == "-1") this.lstPay = []

    this.requestLoanService.listLoanByBorrower(this.idPortfolio, id).subscribe(
        res => this.lstLoan = res
    )

    if(this.selectLoan === "-1") this.lstPay = []
  }

  onSelectChange2(event: any){
    let id = event.target.value

    
    this.payService.listByIdLoan(id).subscribe(
        res => this.lstPay = res
    )
  }

  search(){
    this.payService.listByStateAndIdLoan(this.selectState, Number(this.selectLoan)).subscribe(
      res => this.lstPay = res
    )
    
  }

  showDialog(pay: Pay){
    console.log("PAY----> ", pay)
    
    const dialogRef = this.matDialog.open(DetailPay, {
      width: "600px",
      data: pay
    })

  }


}
