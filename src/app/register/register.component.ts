import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService , private router : Router) {



    setTimeout(()=>{


      if(this.userService.user){

        console.log("Utilisateur courant sur register");
        console.log(this.userService.user);
       this.router.navigateByUrl('home');
    }},500)
  }

  ngOnInit() {

  }

}
