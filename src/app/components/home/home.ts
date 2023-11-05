import { Component } from '@angular/core';

@Component({
  selector: 'app-home-lenderboss',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {
  /*lstDoc:DocumentType[] = [];

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
  }*/

}
