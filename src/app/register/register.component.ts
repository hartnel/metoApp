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
    if(this.userService.isAuth){
      this.router.navigateByUrl('home');
    }
  }

  ngOnInit() {
    
  }

}
