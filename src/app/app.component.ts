import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meteoWaguy';

  constructor(private router : Router , private userService : UserService){
    /*if(!this.userService.isAuth){
      this.router.navigateByUrl('register')
    }*/
  }
}
