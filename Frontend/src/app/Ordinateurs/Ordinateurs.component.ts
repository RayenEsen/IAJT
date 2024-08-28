import { Component, OnInit } from '@angular/core';
import { Ordinateurs } from '../Shared/Ordinateurs';
import { ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UploadImageService } from '../Service/UploadImage.service';
import { OrdinateurService } from '../Service/Ordinateur.service';
import { forkJoin, Observable, of } from 'rxjs';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { ParkUser } from '../Shared/ParkUser';
import { ParkuserService } from '../Service/Parkuser.service';
@Component({
  selector: 'app-Ordinateurs',
  templateUrl: './Ordinateurs.component.html',
  styleUrls: ['./Ordinateurs.component.css']
})
export class OrdinateursComponent implements OnInit {

  constructor( public parkuserservice : ParkuserService,private primengConfig: PrimeNGConfig, public ordinateurService : OrdinateurService, public uploadimage: UploadImageService,private confirmationService: ConfirmationService ,  private messageService: MessageService , private router : Router , private route: ActivatedRoute) { }

  AddOrdinateurVisibile : boolean = false;
  ModifyOrdinateurVisibile : boolean = false;
  searchValue : string = ''  
  cities: string[] = [
    'Tunis',
    'Sfax',
    'Sousse',
    'Kairouan',
    'Bizerte',
    'Medenine',
    'Gabès',
    'Tataouine',
    'Le Kef',
    'Jendouba',
    'Nabeul',
    'Mahdia',
    'Siliana',
    'Kasserine',
    'Zaghouan',
    'Ariana',
    'Manouba',
    'Ben Arous',
    'Sidi Bouzid',
    'Gafsa',
    'Tozeur'
  ];





  UserOptions =  [
    {
        label: 'Ajouter',
        icon: 'pi pi-plus',
        command : () => this.AddParkUser() 
    },
    {
        label: 'Supprimer',
        icon: 'pi pi-minus',
        command : () => this.RemoveParkUser() 
    }
];
  


  typesDesOrdinateurs: string[] = [
    'Portable',
    'Desktop',
    'Serveur',
    'Station de travail',
    'Mini PC',
    'Ordinateur tout-en-un',
    'PC de jeu',
    'PC de bureau',
    'Ultrabook',
    'Netbook',
    'Chromebook',
    'Tablet PC',
    'MacBook',
    'iMac',
    'Raspberry Pi',
    'Serveur de fichiers',
    'NAS',
    'PC industriel',
    'PC embarqué',
    'Thin Client'
  ];


  statusOrdinateur: string[] = [
    'En service',
    'En panne',
    'En maintenance',
    'Remplacé',
    'Hors service',
    'En stock',
    'Désinfecté',
    'Réparé',
    'Prêté',
    'Réservé',
    'En cours de diagnostic',
    'En attente de pièces',
    'Mis à jour',
    'Recyclé',
    'En cours de configuration'
  ];
  
  
  
  selectedordinateurs: Ordinateurs[] = []
  NewOrdinateur : Ordinateurs = new Ordinateurs;
    

  items: any[] = [
    {label: 'Ajouter', icon: 'pi pi-plus', command : () => this.DisplayAddordinateur() }, 
    { label: 'Importer', icon: 'pi pi-file-import', command : () => this.Import()}, 
    {
      label: 'Exporter',
      icon: 'pi pi-file-excel',
      items: [
        { label: 'Excel', icon: 'pi pi-file-excel', command : () => this.ExportExcel() },
        { label: 'PDF', icon: 'pi pi-file-pdf',  },
        { label: 'CSV', icon: 'pi pi-file-pdf',  },

      ]
    },
    { label: 'Supprimer', icon: 'pi pi-file-excel', command : () => this.confirm() },
  ];



  
  ordinateursList: Ordinateurs[] = [];


  nbrOrdinateurs : number = 0;
  originalOrdinateurList: Ordinateurs[] = []
  users: ParkUser[] = [];
  ngOnInit() {
    this.ordinateurService.GetOrdinateurs().subscribe({
      next : (response : Ordinateurs[]) =>
      {
        this.ordinateursList = response
        this.originalOrdinateurList = this.ordinateursList;
        this.nbrOrdinateurs = response.length
      }
    })
    this.parkuserservice.getAllUsers().subscribe({
      next : (response) => { 
        this.users = response;
      }
    })
  }





  confirm() {
    if(this.selectedordinateurs.length!=0)
    {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        icon : "pi pi-exclamation-triangle" ,
        header: 'Confirmation',
        acceptLabel: 'Yes',
          rejectLabel: 'No',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-danger",
          accept: () => {
              this.Remove();
          }
      });
    }
    else{
      this.messageService.add({severity:'secondary', summary:'Supprimer', detail: "Veuillez sélectionner un élément à supprimer."});
    }
}



Remove() {
  // Create an array of observables for deletion requests
  const deleteObservables: Observable<void>[] = this.selectedordinateurs.map(selected => 
    this.ordinateurService.DeleteOrdinateur(selected.id)
  );

  // Use forkJoin to wait for all deletions to complete
  forkJoin(deleteObservables).subscribe(() => {
    // Update the ordinateurs list by removing the deleted items
    this.ordinateursList = this.ordinateursList.filter(ordinateur => 
      !this.selectedordinateurs.some(selected => selected.id === ordinateur.id)
    );

    // Clear the selected ordinateurs
    this.selectedordinateurs = [];

    // Show success message
    this.messageService.add({
      severity: 'success',
      summary: 'Supprimer',
      detail: 'La suppression a été effectuée avec succès.'
    });
  });
}



ExportExcel() {
  // Define the worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedordinateurs);

  // Define the workbook and add the worksheet to it
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Save the Excel file
  XLSX.writeFile(wb, 'exported_data.xlsx');
}


Import() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx';

  input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Assuming the first sheet is the one you want to import
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // Convert the worksheet to an array of objects
          const importedAssets: Ordinateurs[] = [];

          XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1).forEach((row: any) => {
              const ordinateur = new Ordinateurs();

              ordinateur.nom = row[1] || ''; 
              ordinateur.lieu = row[2] || ''; 
              ordinateur.technicienResponsable = row[3] || ''; 
              ordinateur.groupeResponsable = row[4] || '';
              ordinateur.usagerNumero = row[5] || ''; 
              ordinateur.usager = row[6] || '';
              ordinateur.utilisateur = row[7] || ''; 
              ordinateur.groupe = row[8] || ''; 
              ordinateur.commentaires = row[9] || ''; 
              ordinateur.statut = row[10] || ''; 
              ordinateur.typeOrdinateur = row[11] || ''; 
              ordinateur.fabricant = row[12] || ''; 
              ordinateur.modele = row[13] || ''; 
              ordinateur.numeroSerie = row[14] || ''; 
              ordinateur.numeroInventaire = row[15] || ''; 
              ordinateur.reseau = row[16] || ''; 
              ordinateur.uuid = row[17] || ''; 
              ordinateur.sourceMiseAJour = row[18] || '';
              ordinateur.imageurl = row[19] || '';

              this.ordinateurService.CreateOrdinateur(ordinateur).subscribe({
                next : (response)  => {
                  this.ordinateursList.push(response)
                }
              })
              
          });
      };

      reader.readAsArrayBuffer(file);
      this.messageService.add({ severity: 'success', summary: 'Importer', detail: "L'importation a été effectuée avec succès." });

  };

  input.click();

}


DisplayAddordinateur()
{
  this.AddOrdinateurVisibile=!this.AddOrdinateurVisibile
}

loading: boolean = false;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  
  if (file) {
    // Create a FileReader to read the file as Base64
    const reader = new FileReader();
    
    reader.onload = () => {
      // Update the image URL to the Base64 string for real-time display
      this.ViewedOrdinateur.imageurl = reader.result as string;
    };
    
    // Read the file as Base64
    reader.readAsDataURL(file);

    // Pass the selected file to the upload service
    this.uploadimage.GetImage(file);
  }
}


UploadImageAndGetUrl(onComplete: (imageUrl: string | null) => void) {
  if (this.uploadimage.formData) {
    this.uploadimage.uploadSignature().subscribe({
      next: (response) => {
        onComplete(response.secure_url);
      },
      error: (err) => {
        console.error('Upload failed:', err);
        onComplete(null); // Call onComplete with null if the upload fails
      }
    });
  } else {
    // Call onComplete with null if there's no image to upload
    onComplete(null);
  }
}



SaveNewOrdinateur() {
  this.loading = true;

  if (typeof this.selectedUser !== 'string') {
    this.NewOrdinateur.utilisateur = this.selectedUser;
  } else {
    this.NewOrdinateur.utilisateur = ({ ...this.newParkUser });
  }

  // Call UploadImageAndGetUrl and pass the callback directly
  this.UploadImageAndGetUrl((imageUrl) => {
    if (imageUrl) {
      this.NewOrdinateur.imageurl = imageUrl;
    }

    this.ordinateurService.CreateOrdinateur(this.NewOrdinateur).subscribe({
      next: (response) => {
        this.ordinateursList.push(response);
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Ajouter',
          detail: "Le nouvel ordinateur a été ajouté avec succès."
        });
        this.ClearData()
        this.AddOrdinateurVisibile = !this.AddOrdinateurVisibile;
      },
      error: (err) => {
        console.error('Error creating ordinateur:', err);
        this.loading = false;
      }
    });
  });
}




VerifForm()
{
  return !(this.NewOrdinateur.nom.length>0 && this.NewOrdinateur.statut.length>0 && this.NewOrdinateur.lieu.length>0 && this.NewOrdinateur.typeOrdinateur.length>0 && this.NewOrdinateur.groupeResponsable.length>0 && this.NewOrdinateur.technicienResponsable.length>0 && this.NewOrdinateur.fabricant.length>0 && this.NewOrdinateur.modele.length>0 && this.NewOrdinateur.utilisateur.nom.length>0)
}

Search2() {
  if (this.searchValue.trim() !== '') {
      // Filter the list based on the searchkey
      this.ordinateursList = this.ordinateursList.filter(item =>
          Object.values(item).some(val =>
              val !== null && val.toString().toLowerCase().includes(this.searchValue.toLowerCase())
          )
      );
      console.log(this.ordinateursList);
  }
}

Clear()
{
this.ordinateursList = this.originalOrdinateurList;
this.searchValue = ''
}


ViewedOrdinateur : Ordinateurs = new Ordinateurs;
ModifyOrdinateur(ordinateur: Ordinateurs) {
  // Create a deep copy of the ordinateur object
  this.ViewedOrdinateur = { ...ordinateur };
  this.selectedUser = this.ViewedOrdinateur.utilisateur
  this.ModifyOrdinateurVisibile = !this.ModifyOrdinateurVisibile;
}


ClearData()
{
  this.NewOrdinateur = new Ordinateurs();
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
  this.selectedUser = null
}


SaveChanges() {
  this.loading = true;

  if (typeof this.selectedUser !== 'string') {
    this.ViewedOrdinateur.utilisateur = this.selectedUser;
  } else {
    this.ViewedOrdinateur.utilisateur = ({ ...this.newParkUser });
  }

  // Define a callback to handle saving the ordinateur
  const saveOrdinateurChanges = () => {
    this.ordinateurService.UpdateOrdinateur(this.ViewedOrdinateur.id, this.ViewedOrdinateur).subscribe({
      next: (response) => {
        // Find the existing Ordinateur in the list
        const oldOrdinateur = this.ordinateursList.find(item => item.numeroSerie === this.ViewedOrdinateur.numeroSerie);
        
        if (oldOrdinateur) {
          // Merge changes from ViewedOrdinateur into OldOrdinateur
          Object.assign(oldOrdinateur, this.ViewedOrdinateur);
        }

        this.ModifyOrdinateurVisibile = !this.ModifyOrdinateurVisibile;
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour',
          detail: 'Les modifications ont été enregistrées avec succès.'
        });
        this.ClearData()
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating ordinateur:', err);
        this.loading = false;
      }
    });
  };

  // Use UploadImageAndGetUrl to handle the image upload and get the URL
  this.UploadImageAndGetUrl((imageUrl: string | null) => {
    if (imageUrl) {
      this.ViewedOrdinateur.imageurl = imageUrl;
    }

    // Proceed to save changes after handling the image upload
    saveOrdinateurChanges();
  });
}



DisableModify(): boolean {
  // Find the original ordinateur in the ordinateursList that matches the ViewedOrdinateur
  const OldOrdinateur = this.ordinateursList.find(item => item.id === this.ViewedOrdinateur.id);

  if (!OldOrdinateur || this.selectedUser) {
    // If no matching ordinateur is found, consider the object modified
    return true;
  }

  // Compare the properties of ViewedOrdinateur with the found original ordinateur
  const isPropertiesModified = JSON.stringify(this.ViewedOrdinateur) !== JSON.stringify(OldOrdinateur);

  // Compare the image URLs separately
  const isImageModified = this.ViewedOrdinateur.imageurl !== OldOrdinateur.imageurl;

  // Return true if either properties or image URL have changed
  return isPropertiesModified || isImageModified;
}




selectedUser: any;
newParkUser : ParkUser = new ParkUser()

// Method to add a ParkUser
AddParkUser() {
  if(typeof this.selectedUser == "string")
  {
  // Assign the selected user's name to newParkUser
  this.newParkUser.nom = this.selectedUser;

  // Check if the ParkUser already exists in the users array based on the 'nom'
  const exists = this.users.some((user) => user.nom === this.newParkUser.nom);

  // Only add the ParkUser if it does not already exist
  if (!exists) {
    this.parkuserservice.createUser(this.newParkUser).subscribe({
      next : (response) =>{
        this.users.push({ ...response });
        // Use messageService to log the success of adding a ParkUser
        this.messageService.add({
          severity: 'success',
          summary: 'Ajout',
          detail: 'Le nouvel utilisateur a été ajouté avec succès.',
        });
      }
    })
  } else {
    // Use messageService to log that the ParkUser already exists
    this.messageService.add({
      severity: 'warn',
      summary: 'Duplication',
      detail: 'Cet utilisateur existe déjà et ne sera pas ajouté.',
    });
  }
  }
  else return;
}







// Method to remove a ParkUser
RemoveParkUser() {
    // Find the ParkUser to be removed based on the 'nom' matching selectedUser
    const userToRemove = this.users.find(user => user.nom === this.selectedUser.nom);

    // If the user exists, proceed with removal
    if (userToRemove) {
      // Call the service to delete the user by their ID
      this.parkuserservice.deleteUser(userToRemove.id).subscribe({
        next: () => {
          // Remove the user from the local users array
          this.users = this.users.filter(user => user.id !== userToRemove.id);

          // Use messageService to log the success of removing a ParkUser
          this.messageService.add({
            severity: 'success',
            summary: 'Suppression',
            detail: 'L’utilisateur a été supprimé avec succès.',
          });
        }
      });
    } else {
      // Use messageService to log that the ParkUser does not exist
      this.messageService.add({
        severity: 'warn',
        summary: 'Non trouvé',
        detail: 'Cet utilisateur n’existe pas et ne peut pas être supprimé.',
      });
    }
  } 

}