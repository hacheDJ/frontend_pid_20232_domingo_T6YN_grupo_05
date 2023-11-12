import { HttpRequest } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InserRequestLoan } from '../insert.request.loan/insert.requestLoan';
import { InsertUser } from '../insert.user/insert.user';
import { SigninUserComponent } from '../signin.user/signin.user';
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
    }
    
    console.log("lstRoles---> ", this.lstRoles[0])
    
    console.log("--->isAuth ", this.isAuth)
    console.log("--->roleUser ", this.roleUser)
    console.log("--->idUser ", this.idUser)
    console.log("--->idGroupUser ", this.idGroupUser)

  }

  loadComponent(componentName: any) {
    this.dynamicComponentOutlet.clear();

    let component: any;

    if (componentName === 'UpdateUser') {
      component = UpdateUser;
    } else if (componentName === 'InsertUser') {
      component = InsertUser;
    } else if (componentName === 'InserRequestLoan') {
      component = InserRequestLoan;
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
