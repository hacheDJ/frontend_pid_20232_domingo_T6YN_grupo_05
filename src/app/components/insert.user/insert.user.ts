import { Component } from '@angular/core';
import { DocumentType } from 'src/app/models/documentType.model';
import { User } from 'src/app/models/user.model';
import { UserRegisterReq } from 'src/app/dtos/UserRegisterReq.dto';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert.user.html',
  styleUrls: ['./insert.user.css']
})
export class InsertUser {
  lstRoles: String[] = ["ADMIN", "LENDER_BOSS", "LENDER", "BORROWER"]
  roleUser = localStorage.getItem("ROLE_USER")
  idGroupUser = parseInt(localStorage.getItem("ID_GROUP_USER") ?? "-1")

  lstDoc:DocumentType[] = [];
  lstGroup:Group[] = [];

  userRegisterReq: UserRegisterReq = {
    namesUser: "",
    lastnameP: "",
    lastnameM: "",
    address: "",
    cellphone: "",
    email: "",
    userLogin: "",
    passwordLogin: "",
    confirmPasswordLogin: "",
    dateBirth: null,
    numberDoc: "",
    idDocType: {
      id: -1
    },
    idGroup: {
      id: -1
    },
    role: "-1"
  };

  objUser: User = {};

  constructor(private userService: UserService, private utilService: UtilService) {
    this.utilService.listDocuments().subscribe(
      item => this.lstDoc = item
    );

    this.utilService.listGroups().subscribe(
      item => this.lstGroup = item
    );

  }

  registerr(){
    if(this.roleUser === this.lstRoles[0]){
      console.log("DENTRO DEL REGISTER DEL ADMIN");

      this.userRegisterReq.registrationDate = new Date()
      this.userRegisterReq.updateDate = new Date()

      this.userService.register(this.userRegisterReq).subscribe(
        x => {
          if(x.error){
            alert(x.message)
            return
          }
        
          alert(x.message)
          window.location.reload()

        }
      );
    }else if(this.roleUser === this.lstRoles[1]){
      console.log("DENTRO DEL REGISTER LENDER A GROUP DE LENDER BOSS");
      

      const group = new Group()
      group.id = parseInt(localStorage.getItem("ID_GROUP_USER") ?? "-1") 

      this.userRegisterReq.registrationDate = new Date()
      this.userRegisterReq.updateDate = new Date()
      this.userRegisterReq.idGroup = group
      this.userRegisterReq.role = this.lstRoles[2]

      this.userService.register(this.userRegisterReq).subscribe(
        x => {
          if(x.error){
            alert(x.message)
            return
          }
        
          alert(x.message)
          window.location.reload()

        }
      );
    }

    console.log("---SELECT---> ", this.userRegisterReq.role);
    console.log("---SELECT---> ", typeof this.userRegisterReq.role);
    
  }


}
