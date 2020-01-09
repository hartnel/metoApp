
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Form, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  
})
   
export class ProfileComponent implements OnInit {

  private name = "COMERAUER";
  private prename = "Alain ";
  private date = new Date(2000, 0, 2);
  private sex = "Masculin";
  private fileBlob;
  startDate = new Date(2000, 0, 2);
  //picker;
  
  constructor(private user:UserService) { }


  testFile() {    
    console.log("Heloo gyuy");
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
    src.addEventListener("change", function () {
      // fill fr with image data
      console.log("Je suis entré");
      fr.readAsDataURL(src.files[0]);
      this.fileBlob = new Blob([src.files[0]], {type:'application/image'});
      this.user.updateProfile({profile:this.fileBlob}).then(function() {
        console.log("On a enregistré");
      },  
      function(err) {
        console.log("Il y'a eu une erreur");
      });
      console.log(this.fileBlob);
    });
  }
  
  changeImage() {
    document.getElementById("image").click();
  }

  onSubmit(form:NgForm) {
      this.name = form.controls["name"].value;
      this.prename = form.controls["prename"].value;
      this.sex = form.controls["sex"].value;
      this.date = form.controls["date"].value;
      console.log(form.controls["date"].value); 
      let temp = {lastname: this.name, firstname: this.prename, sex: this.sex, birthday:this.date};
      this.user.register().then(function() {
        console.log("On a enregistré");
      },
      function(err) {
        console.log("Il y'a eu une erreur");
        console.log(err);
      });
      this.user.updateProfile(temp).then(function() {
        console.log("On a enregistré");
      },
      function(err) {
        console.log("Il y'a eu une erreur");
        console.log(err);
      });
  }  

  ngOnInit() {
    this.testFile();
  }

}
