
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Form } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  
})
   
export class ProfileComponent implements OnInit {

  private name = "COMERAUER";
  private prename = "Alain ";
  private date = "02/03/2003";
  private sex = "Masculin";
  private fileBlob;
  startDate = new Date(2000, 0, 2);
  //picker;

  constructor() { }


  testFile() {    
    console.log("Heloo gyuy");
    let id = document.getElementById("image");
    let target = document.getElementById("target");
    this.showImage(id, target);
  }

  showImage(src, target) {
    var fr = new FileReader();
    
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function (e) {
      target.src = this.result;
    };
    src.addEventListener("change", function () {
      // fill fr with image data
      console.log("Je suis entré");
      fr.readAsDataURL(src.files[0]);
      this.fileBlob = new Blob([src.files[0]], {type:'application/image'});
      console.log(this.fileBlob);
    });
  }

  changeImage() {
    document.getElementById("image").click();
  }

  onSubmit(form:Form) {
      
  }

  ngOnInit() {
    this.testFile();
  }

}
