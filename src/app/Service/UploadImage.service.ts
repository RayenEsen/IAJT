import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

constructor(private http: HttpClient) { }


formData: FormData = new FormData();
private Url : string = "https://api.cloudinary.com/v1_1/dlemizbf5/image/upload"


GetImage(file: File) {
  // Append the file and additional data to FormData
  this.formData.append('file', file);
  this.formData.append('cloud_name', 'dlemizbf5');
  this.formData.append('upload_preset', 'eymttuzo'); 
}


uploadSignature(): Observable<any>{
    // Create a more unique public_id using timestamp and random string
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
    const uniqueId = `${timestamp}_${randomString}`;
    this.formData.append('public_id', uniqueId);
    return this.http.post(this.Url,this.formData)
}




}
