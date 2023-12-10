import { Component, ViewChild, ElementRef } from '@angular/core';
import { UserRegisterReq } from 'src/app/dtos/UserRegisterReq.dto';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { DocumentType } from 'src/app/models/documentType.model';
import { Group } from 'src/app/models/group.model';
import { UserListByRoleBossAndLenderRes } from 'src/app/dtos/UserListByRoleBossAndLenderRes.dto';
import { UserToEditReq } from 'src/app/dtos/UserToEditReq.dto';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update.user.html',
  styleUrls: ['./update.user.css'],
  providers: [DatePipe]
})
export class UpdateUser {
  @ViewChild('dateBirdtInput', { static: false }) dateBirdtInput: ElementRef | undefined;
  
  lstDoc: DocumentType[] = []
  lstUserLenderBossAndLender: UserListByRoleBossAndLenderRes[] = []
  lstGroup:Group[] = [];
  lstUserLenderByGroup: UserListByRoleBossAndLenderRes[] = []

  roleUser = localStorage.getItem("ROLE_USER")
  idGroup = Number(localStorage.getItem("ID_GROUP_USER"))
  idUser = Number(localStorage.getItem("ID_USER"))
  lstRoles: String[] = ["ADMIN", "LENDER_BOSS", "LENDER", "BORROWER"]

  myFormEdit: FormGroup

  userRegisterReq: UserRegisterReq = {
    id: -1,
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

  userToEditReq: UserToEditReq = {}
  
  objUser: User = {
    idGroup:{
      id: this.idGroup
    }
  };



  constructor(private userService: UserService, private utilService: UtilService,  private datePipe: DatePipe, private fb: FormBuilder) {
    this.myFormEdit = this.fb.group({
      id: -1,
      namesUser: [''],
      lastnameP: [''],
      lastnameM: [''],
      address: [''],
      cellphone: [''],
      email: [''],
      userLogin: [''],
      passwordLogin: [''],
      confirmPasswordLogin: [''],
      dateBirth: null,
      numberDoc: [''],
      idDocType: {
      id: -1
    },
    idGroup: {
      id: -1
    },
    role: "-1"
    });
    //console.log("------->LOG", this.objUser.id, " ->>", localStorage.getItem("ID_GROUP_USER") ?? "-1")
    
    
    this.myFormEdit.get("confirmPasswordLogin")?.disable()
    //this.objUser.idGroup!.id = parseInt(localStorage.getItem("ID_GROUP_USER") ?? "-1")

    this.utilService.listDocuments().subscribe(
      item => this.lstDoc = item
    )
    this.utilService.listUserByRoleLenderBossAndLender().subscribe(
      item => this.lstUserLenderBossAndLender = item
    )
    this.utilService.listGroups().subscribe(
      item => this.lstGroup = item
    )
    this.userService.findUserLenderToEditByGroup(this.objUser).subscribe(
      item => this.lstUserLenderByGroup = item
    )
      //this.dateBirdtInput!.nativeElement.value = "2023-11-09"
      //console.log("dateBirth ----->",document.getElementById("dateBirth"))
  }

  /* ngAfterViewInit() {
    dateBirdtInput: this.userRegisterReq.dateBirth
  } */

/*   registerr(){
    this.userRegisterReq.registrationDate = new Date()
    this.userRegisterReq.updateDate = new Date()

    this.userService.register(this.userRegisterReq).subscribe(
      item => {
        alert(item.message)
      }
    );
  } */

  edit(){
    //this.userRegisterReq.registrationDate = new Date()
    this.userRegisterReq.updateDate = new Date()

    this.userService.update(this.userRegisterReq).subscribe(
      item => {
        if(item.error)
          alert(item.message)
        else{
          alert(item.message)
          window.location.reload()
        }
      }
    )

  }

  get showListUsers(): any[] {
    //return value === 'ok' ? this.lstUserLenderBossAndLender : this.lstUserLenderByGroup
    let list: any[] = []

    if(localStorage.getItem("ROLE_USER") === "ADMIN"){
      list = this.lstUserLenderBossAndLender
      console.log(">>>>>>> LST ADMIN");
      
    }
    if(localStorage.getItem("ROLE_USER") === "LENDER_BOSS"){
      list = this.lstUserLenderByGroup
      console.log(">>>>>>> LST LENDER_BOSS");
    }

    return list
  }

  onSelectChange(event: any){
    let id = event.target.value

    this.userToEditReq.id = id

    if(id === "-1"){
      this.myFormEdit.reset()

      return
    }

    this.userService.findUserToEdit(this.userToEditReq).subscribe(
      item => {
        if(item.error){
          alert(item.message)
          return
        }

        this.userRegisterReq.namesUser = item.userToEditRes.namesUser
        this.userRegisterReq.lastnameP = item.userToEditRes.lastnameP
	      this.userRegisterReq.lastnameM = item.userToEditRes.lastnameM
	      this.userRegisterReq.address = item.userToEditRes.address
	      this.userRegisterReq.cellphone = item.userToEditRes.cellphone
	      this.userRegisterReq.email = item.userToEditRes.email
	      this.userRegisterReq.userLogin = item.userToEditRes.userLogin
	      this.dateBirdtInput!.nativeElement.value = this.datePipe.transform(item.userToEditRes.dateBirth, "yyyy-MM-dd")
	      this.userRegisterReq.numberDoc = item.userToEditRes.numberDoc
	      this.userRegisterReq.idDocType!.id = item.userToEditRes.idDocType
	      this.userRegisterReq.idGroup!.id = item.userToEditRes.idGroup
	      this.userRegisterReq.role = item.userToEditRes.role
      }
    )

  }

  onInputChange(event: Event){
    this.myFormEdit.get("confirmPasswordLogin")?.enable()

    const value = (event.target as HTMLInputElement).value

    if(value === "") {
      this.myFormEdit.get("confirmPasswordLogin")?.disable()
      this.myFormEdit.get("confirmPasswordLogin")?.setValue("")
    }

    
  }

}
