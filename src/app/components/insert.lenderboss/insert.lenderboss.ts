import { Component } from '@angular/core';
import { DocumentType } from 'src/app/models/documentType.model';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-insert-lenderboss',
  templateUrl: './insert.lenderboss.html',
  styleUrls: ['./insert.lenderboss.css']
})
export class InsertLenderBoss {
  lstDoc:DocumentType[] = [];

  userLenderBoss: User = {
    namesUser: "",
    lastnameP: "",
    lastnameM: "",
    address: "",
    cellphone: "",
    email: "",
    userLogin: "",
    passwordLogin: "",
    dateBirth: null,
    idDocType: {
      id: -1
    }
  };

  objUser: User = {};
  objRole: Role = {};

  constructor(private userService: UserService, private utilService: UtilService) {
    utilService.listDocuments().subscribe(
      x => this.lstDoc = x
    );

    this.objUser.id = 1;
    this.objRole.id = 2
  }

  registerr(){
    this.userLenderBoss.registrationDate = new Date();
    this.userLenderBoss.idRole = this.objRole;
    this.userService.register(this.userLenderBoss).subscribe(
      x => {
        alert(x.message)
      }
    );
  }

}
