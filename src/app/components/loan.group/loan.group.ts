import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanDetailByLenderRes } from 'src/app/dtos/LoanDetailByLenderRes.dto';
import { RequestLoanSearch } from 'src/app/dtos/RequestLoanSearch.dto';
import { UserListByRoleBossAndLenderRes } from 'src/app/dtos/UserListByRoleBossAndLenderRes.dto';
import { UserSigninRes } from 'src/app/dtos/UserSigninRes.dto';
import { UserToEditReq } from 'src/app/dtos/UserToEditReq.dto';
import { RequestLoan } from 'src/app/models/requestLoan.model';
import { User } from 'src/app/models/user.model';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UserService } from 'src/app/services/user.service';
import { ReadPay } from '../read.pay/read.pay';
import { UpdateRequestLoan } from '../update.request.loan/update.request.loan';


@Component({
  selector: 'app-loan-group',
  templateUrl: './loan.group.html',
  styleUrls: ['./loan.group.css']
})
export class LoanGroup {
  lstLender: UserListByRoleBossAndLenderRes[] = []
  lstDetailLoan: LoanDetailByLenderRes[] = []

  userToeditReq: UserToEditReq = {
    idGroup: {
        id: Number(localStorage.getItem("ID_GROUP_USER"))
    }
  }

  constructor(private userService: UserService, private requestLoanService: RequestLoanService){
    this.userService.findUserLenderToEditByGroup(this.userToeditReq).subscribe(res => this.lstLender = res)
  }

  onSelectChange(event: any){
    console.log("EVENT", event.target.value);
    let idLender = event.target.value

    this.requestLoanService.listLoanDetailByLender(idLender).subscribe(
      res =>{ this.lstDetailLoan = res
        console.log("detail -> ", this.lstDetailLoan)
      }
      
    )

    
    
    
  }

}
