import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestLoanSearch } from 'src/app/dtos/RequestLoanSearch.dto';
import { UserSigninRes } from 'src/app/dtos/UserSigninRes.dto';
import { RequestLoan } from 'src/app/models/requestLoan.model';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UserService } from 'src/app/services/user.service';
import { ReadPay } from '../read.pay/read.pay';
import { UpdateRequestLoan } from '../update.request.loan/update.request.loan';


@Component({
  selector: 'app-read-loan',
  templateUrl: './read.loan.html',
  styleUrls: ['./read.loan.css']
})
export class ReadLoan {
  /* lstBorrower: UserSigninRes[] = [] */
  lstRequestLoan: RequestLoan[] = []

  requestLoanSearch: RequestLoanSearch = {
    start: null,
    end: null,
    state: "-1"
  }

  idUser = Number(localStorage.getItem("ID_USER"))
  idPortfolio = Number(localStorage.getItem("ID_PORTFOLIO"))
  
  constructor(private userService: UserService, private requestLoanService: RequestLoanService, private matDialog: MatDialog){
    
  }



  search(){
    console.log("---> STATE ", this.requestLoanSearch.state);
    this.requestLoanService.listByRegistrationDateRangeAndState(this.requestLoanSearch.start!, this.requestLoanSearch.end!, this.requestLoanSearch.state!, this.idUser, this.idPortfolio).subscribe(
      res => this.lstRequestLoan = res
    )
    
  }

  showDialog(idLoan: number){
    console.log("idLoan----> ", idLoan)
    
    const dialogRef = this.matDialog.open(ReadPay, {
      data: idLoan
    })

  }


}
