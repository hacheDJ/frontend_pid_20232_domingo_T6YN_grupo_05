import { Component, OnInit } from '@angular/core';
import { UserSignInRequest } from 'src/app/dtos/UserSignInRequest.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin.user.html',
  styleUrls: ['./signin.user.css']
})
export class SigninUserComponent implements OnInit{
  isAuthenticate = false

  userSignInRequest: UserSignInRequest = {
	  userLogin: "",
	  passwordLogin: ""
  };

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    if(localStorage.getItem("TOKEN")){
      this.isAuthenticate = true
    }else{
      this.isAuthenticate = false
    }

  }

  signInn(){
    this.authService.signIn(this.userSignInRequest).subscribe(
      d => {
        //alert(d.message)
        if(d.error){
          alert(d.message)
          return
        }

        localStorage.setItem("TOKEN", d.token)
        localStorage.setItem("ROLE_USER", d.user.role)
        localStorage.setItem("ID_USER", d.user.id)
        localStorage.setItem("NAME_USER", `${d.user.namesUser} ${d.user.lastnameP}`)
        localStorage.setItem("ID_GROUP_USER", d.user.idGroup)
        localStorage.setItem("ID_PORTFOLIO", d.user.idPortfolio)

        alert(d.message)
        window.location.reload()
      }
    );
    //console.log(this.userSignInRequest.passwordLogin)
    //console.log(this.userSignInRequest.userLogin)
    console.log("TOKEN EN STORAGE ----> ",localStorage.getItem("TOKEN"))
    console.log("ROLE EN STORAGE ----> ",localStorage.getItem("ROLE_USER"))

    
  }

}
