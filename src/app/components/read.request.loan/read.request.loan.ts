import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-read-request-loan',
  templateUrl: './read.request.loan.html',
  styleUrls: ['./read.request.loan.css']
})
export class ReadRequestLoan {
    lstBorrowerByLender: User[] = []

    constructor(){
        
    }


}
