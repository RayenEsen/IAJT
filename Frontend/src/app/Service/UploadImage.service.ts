import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

constructor(private http: HttpClient) { }


formData: FormData = new FormData();
private Url : string = "" //Here put the api


GetImage(file: File) {
  // Append the file and additional data to FormData
  this.formData.append('file', file);
  this.formData.append('cloud_name', ''); //Here out the cloud name
  this.formData.append('upload_preset', ''); //Here put the cloud preset
}


uploadSignature(): Observable<any>{
    // Create a more unique public_id using timestamp and random string
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
    const uniqueId = `${timestamp}_${randomString}`;
    this.formData.append('public_id', uniqueId);
    return this.http.post(this.Url,this.formData).pipe(
      tap({
        complete: () => {
          this.formData = new FormData();
        }
      })
    )
}

}
