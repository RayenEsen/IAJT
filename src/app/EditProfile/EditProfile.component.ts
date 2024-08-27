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


  imageSrc: string = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  onFileSelected(event: any) {
      const file: File = event.target.files[0];
      
      if (file) {
          // Create a FileReader to read the file as Base64
          const reader = new FileReader();
          
          // Read the file as Base64
          reader.readAsDataURL(file);
          
          // On load, update the image source
          reader.onload = () => {
              this.imageSrc = reader.result as string;
          };
          
          // Pass the selected file to the upload service
          this.UploadImage.GetImage(file);
  
          // Clear the file input after use
          const fileInput = document.getElementById('file-input') as HTMLInputElement;
          if (fileInput) {
              fileInput.value = '';
          }
      }
  }
  

}
