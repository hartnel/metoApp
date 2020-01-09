import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

//Observable<Any>
  public uploadImage(image: File) {
    var blob = new Blob([image]);

    //return this.http.post('/api/v1/image-upload', formData);
  }
}
