import { Component } from '@angular/core';
import { BankAccount } from 'src/app/models/bankAccount.model';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-insert-bank-account',
  templateUrl: './insert.bank.account.html',
  styleUrls: ['./insert.bank.account.css']
})

export class InsertBankAccount{
  lstBankAccount: BankAccount[] = []
  myForm: FormGroup
  bankAccount: BankAccount = {
    id: -1,
	  numberAccount: "",
    bankName: ""
  }

  constructor(private bankAccountService: BankAccountService, private matDialog: MatDialog, private dialogRef: MatDialogRef<InsertBankAccount>, fb: FormBuilder){
    this.myForm = fb.group({
      id: -1,
      numberAccount: [""],
      bankName: [""],
      numberAccountDisabled: [""],
      numberAccountReg: [""]
    })
    
    this.bankAccountService.listAll().subscribe(res => this.lstBankAccount = res)
  }

  ngOnInit(): void {
  }

  insert(){
    this.bankAccount.numberAccount = this.myForm.get("numberAccountReg")?.value

    this.bankAccountService.insert(this.bankAccount).subscribe(
      res => {
        if(res.error){
          alert(res.message)
          return
        }

        alert(res.message)

        this.dialogRef.close(this.myForm.get("numberAccountReg")?.value)
      }
    )

    
    
  }
 
  onSelectChange(event: Event){

    const value = (event.target as HTMLInputElement).value
    console.log(typeof value, value, value === "-1");

    if(value === "-1") {
      this.myForm.get("numberAccountDisabled")?.setValue("")
      return
    }

    this.bankAccountService.findById(Number(value)).subscribe(
      res =>  this.myForm.get("numberAccountDisabled")?.setValue(res.numberAccount)
    )

    
  }

  selectAccount(){
    this.dialogRef.close(this.myForm.get("numberAccountDisabled")?.value)
  }

  closeDialog(from: string){
    this.dialogRef.close()
  }

}
