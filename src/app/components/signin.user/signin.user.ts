import { Component } from '@angular/core';
import { UserSignInRequest } from 'src/app/dtos/UserSignInRequest.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin.user.html',
  styleUrls: ['./signin.user.css']
})
export class SigninUserComponent {
  userSignInRequest: UserSignInRequest = {
	  userLogin: "",
	  passwordLogin: ""
  };

  constructor(private authService: AuthService) {

  }

  signInn(){
    this.authService.signIn(this.userSignInRequest).subscribe(
      x => {
        alert(x.message)
      }
    );
    /*console.log(this.userSignInRequest.passwordLogin)
    console.log(this.userSignInRequest.userLogin)*/
  }

}
