
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @Input()
  isNew: boolean;
  user = {
    lastname: "",
    firstname: "",
    birthday: new Date(2000, 0, 2),
    sex: "Masculin",
    profile: undefined
  }
  userForm: FormGroup;
  private fileBlob;
  Sexs: any = ['Masculin', 'Feminin'];
  ///=user: any;
  constructor(private router: Router ,private userService: UserService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    if(this.userService.isAuth){
      this.router.navigateByUrl('home');
    }
    this.testFile();
    if (this.isNew) {
      this.userService.clearDB();
      this.initForm();
      this.userService.register("", "")
        .then(() => {
          this.user = this.userService.user;
        })

    }
    else {
      this.user = this.userService.user;
      this.initForm();
    }

  }

  initForm() {
    this.userForm = this.formBuilder.group({
      ...this.user
    });
  }

  testFile() {
    let id = document.getElementById("image");
    let target = document.getElementById("target");
    this.showImage(id, target);
  }

  showImage(src, target) {
    let fr = new FileReader();

    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function (e) {
      target.src = this.result;
    };
    src.addEventListener("change", () => {
      fr.readAsDataURL(src.files[0]);
      this.fileBlob = new Blob([src.files[0]], { type: 'application/image' });
      if (this.isNew) {
        this.userService.register("", "", new Date(), "")
          .then(() => {
            this.updateImage()
          })
          .catch(err => console.log(err))
      }
      else {
        this.updateImage()
      }
    });
  }

  changeImage() {
    document.getElementById("image").click();
  }

  updateImage() {
    this.userService.updateProfile({ profile: this.fileBlob })
      .then(() => {
        this.user = this.userService.user;
      }).catch(err => {
        console.log(err);
      })
  }

  onSubmit() {
    let formData = this.userForm.value;
    this.user = { ...formData };
    this.userService.updateProfile({...formData})
      .then(() => {
        this.user = this.userService.user;
        console.log(this.user);
        this.router.navigateByUrl('home');

      })
      .catch(err => console.log(err))
  }
}
