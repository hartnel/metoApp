import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MeteoApp';

  constructor(private userService: UserService) {
    window['user'] = this.userService

  }

  ngOnInit() {
  //   this.userService.testUser().then(users => console.log(users))
  //   this.userService.clearDB()
  //   this.userService.register("kritikos" , "Programmation123")
  //   .then(()=>{
  //     console.log('registered')
  //   })
  //   .catch(err => console.log(err))

  //   this.userService.login('kritikos', 'Programmation123')
  //     .then(user => {
  //       console.log(this.userService.isAuth)
  //       this.userService.updateProfile({ username: 'hartnel' })
  //         .then(() => {
  //           console.log(this.userService.user)
  //         })
  //         .catch(err => console.log(err));
  //     })
  //     .catch(err => console.log(err))
  }


}
