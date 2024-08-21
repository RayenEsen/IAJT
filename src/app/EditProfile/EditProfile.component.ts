import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { SessionService } from '../Utils/Session.service';
import { User } from '../Shared/User';
import { UploadImageService } from '../Service/UploadImage.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom // Use ShadowDom for stricter encapsulation

})
export class EditProfileComponent implements OnInit {

  constructor(public session : SessionService , public UploadImage : UploadImageService) { }

  user : User = new User;
  ngOnInit() {
    this.user=this.session.User
  }


  formData: FormData = new FormData();
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    // Create FormData object
    
    // Append the file and additional data to FormData
    this.formData.append('file', file);
    this.formData.append('cloud_name', 'dlemizbf5');
    this.formData.append('upload_preset', 'qbxmexkd'); // Add your upload preset here
    
    // Create a custom public_id (e.g., filename + today's date)
    const fileName = file.name.split('.')[0]; // Get the file name without extension
    const todaysDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    this.formData.append('public_id', `${fileName}_${todaysDate}`);
  }

}
