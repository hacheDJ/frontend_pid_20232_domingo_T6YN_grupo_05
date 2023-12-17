import { Component } from '@angular/core';
import { ReviewFinancialPerformanceRes } from 'src/app/dtos/review.financial.performance.res';
import { UserListByRoleBossAndLenderRes } from 'src/app/dtos/UserListByRoleBossAndLenderRes.dto';
import { RequestLoanService } from 'src/app/services/requestLoan.service';
import { UserService } from 'src/app/services/user.service';
/* import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs; */


@Component({
  selector: 'app-admin-loan-group',
  templateUrl: './admin.loan.group.html',
  styleUrls: ['./admin.loan.group.css']
})
export class AdminLoanGroup {
  lstLenderBoss: UserListByRoleBossAndLenderRes[] = []
  lstReviewFinancialPerformance: ReviewFinancialPerformanceRes[] = []

  pageSize = 4
  page = 1

  totalBorrowed = 0
  totalPaid = 0
  totalPending = 0
  totalRentability = 0

  //pdfMake.vfs = pdfFonts.pdfMake.vfs

  constructor(private userService: UserService, private requestLoanService: RequestLoanService){
    this.userService.listByRoleLenderBoss().subscribe(res => this.lstLenderBoss = res)
  }

  onSelectChange(event: any){
    console.log("ID_USER_LENDER_BOSS", event.target.value);
    let idLenderBoss = event.target.value

    this.userService.findById(idLenderBoss).subscribe(res => {
      if(res.err){
          alert(res.msg)
      }else{
        const idGroup = res.user!.idGroup!.id!
        
        this.requestLoanService.reviewFinancialPerformance(idGroup).subscribe(
          res => {
            this.lstReviewFinancialPerformance = res
            
            this.totalBorrowed = 0
            this.totalPaid = 0
            this.totalPending = 0
            this.totalRentability = 0

            if(this.lstReviewFinancialPerformance.length != 0){
              this.lstReviewFinancialPerformance.forEach(value => {
                console.log("ITEM------>",value)
                this.totalBorrowed += value.borrowed!
                this.totalPaid += value.paid!
                this.totalPending += value.pending!
                this.totalRentability += value.rentability!
              })
            }
          }
        )
      }
    })

   

    
    
    
  }

}
