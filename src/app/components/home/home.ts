import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AdminLoanGroup } from '../admin.loan.group/admin.loan.group';
import { InsertPay } from '../insert.pay/insert.pay';
import { InsertRequestLoan } from '../insert.request.loan/insert.requestLoan';
import { InsertUser } from '../insert.user/insert.user';
import { LoanGroup } from '../loan.group/loan.group';
import { ReadLoan } from '../read.loan/read.loan';
import { ReadRequestLoan } from '../read.request.loan/read.request.loan';
import { UpdateUser } from '../update.user/update.user';

@Component({
  selector: 'app-home-lenderboss',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home  implements OnInit{

  isAuth = false
  roleUser = ""
  idUser = -1
  idGroupUser = -1
  idPortfolio = -1
  nameUser = ""

  lstRoles: String[] = ["ADMIN", "LENDER_BOSS", "LENDER", "BORROWER"]

  @ViewChild('dynamicComponentOutlet', { read: ViewContainerRef })
  dynamicComponentOutlet!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
   
  }

  ngOnInit(): void {
    if(localStorage.getItem("TOKEN")){
      this.isAuth = true
      this.roleUser = localStorage.getItem("ROLE_USER") ?? ""
      this.idUser = parseInt(localStorage.getItem("ID_USER") ?? "-1")
      this.idGroupUser = parseInt(localStorage.getItem("ID_GROUP_USER") ?? "-1")
      this.nameUser = localStorage.getItem("NAME_USER") ?? ""
      this.idPortfolio = Number(localStorage.getItem("ID_PORTFOLIO"))
    }
    
    console.log("lstRoles---> ", this.lstRoles[0])
    
    console.log("--->isAuth ", this.isAuth)
    console.log("--->roleUser ", this.roleUser)
    console.log("--->idUser ", this.idUser)
    console.log("--->idGroupUser ", this.idGroupUser)
    console.log("--->idPortfolio ", this.idPortfolio)

  }

  loadComponent(componentName: any) {
    this.dynamicComponentOutlet.clear();

    let component: any;

    if (componentName === 'UpdateUser') {
      component = UpdateUser;
    } else if (componentName === 'InsertUser') {
      component = InsertUser;
    } else if (componentName === 'InsertRequestLoan') {
      component = InsertRequestLoan;
    } else if (componentName === 'ReadRequestLoan') {
      component = ReadRequestLoan;
    } else if (componentName === 'ReadLoan') {
      component = ReadLoan;
    } else if (componentName === 'InsertPay') {
      component = InsertPay;
    } else if (componentName === 'LoanGroup') {
      component = LoanGroup;
    } else if (componentName === 'AdminLoanGroup') {
      component = AdminLoanGroup;
    }


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.dynamicComponentOutlet.parentInjector);
    this.dynamicComponentOutlet.insert(componentRef.hostView);
  }

  logOut(){
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("ROLE_USER")
    localStorage.removeItem("ID_USER")
    localStorage.removeItem("ID_GROUP_USER")
    localStorage.removeItem("NAME_USER")
    this.isAuth = false
    this.roleUser = ""
    this.idUser = -1
    this.idGroupUser = -1
    this.nameUser = ""

    window.location.reload()
  }

}
