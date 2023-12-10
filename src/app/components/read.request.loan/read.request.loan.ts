import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestLoanSearch } from 'src/app/dtos/RequestLoanSearch.dto';
import { UserSigninRes } from 'src/app/dtos/UserSigninRes.dto';
import { RequestLoan } from 'src/app/models/requestLoan.model';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateRequestLoan } from '../update.request.loan/update.request.loan';


@Component({
  selector: 'app-read-request-loan',
  templateUrl: './read.request.loan.html',
  styleUrls: ['./read.request.loan.css']
})
export class ReadRequestLoan {
  lstBorrower: UserSigninRes[] = []
  lstRequestLoan: RequestLoan[] = []

  requestLoanSearch: RequestLoanSearch = {
    start: null,
    end: null
  }

  idUser = Number(localStorage.getItem("ID_USER"))
  idPortfolio = Number(localStorage.getItem("ID_PORTFOLIO"))
  
  constructor(private userService: UserService, private requestLoanService: RequestLoanService, private matDialog: MatDialog){
    this.userService.listByIdPortfolio(this.idPortfolio).subscribe(res => this.lstBorrower = res)
    this.requestLoanService.listByLender(this.idPortfolio).subscribe(res => this.lstRequestLoan = res)
  }

  onSelectChange(event: any){
    let id = event.target.value

    this.requestLoanService.listByIdBorrower(id).subscribe(
      res => this.lstRequestLoan = res
    )
  }

  search(){
    //console.log("---> START ", this.requestLoanSearch.start);
    this.requestLoanService.listByRegistrationDateRange(this.requestLoanSearch.start!, this.requestLoanSearch.end!, this.idPortfolio).subscribe(
      res => this.lstRequestLoan = res
    )
    
  }

  showDialog(requestLoan: RequestLoan){
    console.log("idRL----> ", requestLoan)
    
    const dialogRef = this.matDialog.open(UpdateRequestLoan, {
      width: "600px",
      data: requestLoan
    })

  }


}
