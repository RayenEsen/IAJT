import { Component, OnInit } from '@angular/core';
import { Ordinateurs } from '../Shared/Ordinateurs';
import { ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UploadImageService } from '../Service/UploadImage.service';
import { OrdinateurService } from '../Service/Ordinateur.service';
import { forkJoin, Observable } from 'rxjs';
@Component({
  selector: 'app-Ordinateurs',
  templateUrl: './Ordinateurs.component.html',
  styleUrls: ['./Ordinateurs.component.css']
})
export class OrdinateursComponent implements OnInit {

  constructor(public ordinateurService : OrdinateurService, public uploadimage: UploadImageService,private confirmationService: ConfirmationService ,  private messageService: MessageService , private router : Router , private route: ActivatedRoute) { }

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



  originalOrdinateurList: Ordinateurs[] = []
  ngOnInit() {
    this.ordinateurService.GetOrdinateurs().subscribe({
      next : (response : Ordinateurs[]) =>
      {
        this.ordinateursList = response
        this.originalOrdinateurList = this.ordinateursList;
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

              ordinateur.nom = row[0] || ''; 
              ordinateur.lieu = row[1] || ''; 
              ordinateur.technicienResponsable = row[2] || ''; 
              ordinateur.groupeResponsable = row[3] || '';
              ordinateur.usagerNumero = row[4] || ''; 
              ordinateur.usager = row[5] || '';
              ordinateur.utilisateur = row[6] || ''; 
              ordinateur.groupe = row[7] || ''; 
              ordinateur.commentaires = row[8] || ''; 
              ordinateur.statut = row[9] || ''; 
              ordinateur.typeOrdinateur = row[10] || ''; 
              ordinateur.fabricant = row[11] || ''; 
              ordinateur.modele = row[12] || ''; 
              ordinateur.numeroSerie = row[13] || ''; 
              ordinateur.numeroInventaire = row[14] || ''; 
              ordinateur.reseau = row[15] || ''; 
              ordinateur.uuid = row[16] || ''; 
              ordinateur.sourceMiseAJour = row[17] || '';

              importedAssets.push(ordinateur);
              
          });

          this.ordinateursList.push(...importedAssets);
          this.messageService.add({ severity: 'success', summary: 'Importer', detail: "L'importation a été effectuée avec succès." });
      };

      reader.readAsArrayBuffer(file);
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

    // Clear the file input after use
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}


SaveNewOrdinateur() {
  this.loading = true;

  // Define a method to handle the completion of the upload
  const handleUploadComplete = (response?: any) => {
    if (response) {
      // Assign values directly without optional chaining
      this.NewOrdinateur.imageurl = response.secure_url;
    }

    this.ordinateurService.CreateOrdinateur(this.NewOrdinateur).subscribe({
      next: (response) => {
        this.ordinateursList.push(response);
        this.NewOrdinateur = new Ordinateurs();
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Ajouter',
          detail: "Le nouvel ordinateur a été ajouté avec succès."
        });
        this.AddOrdinateurVisibile = !this.AddOrdinateurVisibile;
      },
      error: (err) => {
        console.error('Error creating ordinateur:', err);
        this.loading = false; // Ensure loading is stopped even on error
      }
    });
    
  };

  // If there's an image to upload
  if (this.uploadimage.formData) {
    this.uploadimage.uploadSignature().subscribe({
      next: handleUploadComplete,
      error: (err) => {
        console.error('Upload failed:', err);
        handleUploadComplete(); // Still handle the completion even if the upload fails
      }
    });
  } else {
    // If no image to upload, handle the completion directly
    handleUploadComplete();
  }
}


VerifForm()
{
  return !(this.NewOrdinateur.nom.length>0 && this.NewOrdinateur.statut.length>0 && this.NewOrdinateur.lieu.length>0 && this.NewOrdinateur.typeOrdinateur.length>0 && this.NewOrdinateur.groupeResponsable.length>0 && this.NewOrdinateur.technicienResponsable.length>0 && this.NewOrdinateur.fabricant.length>0 && this.NewOrdinateur.modele.length>0 && this.NewOrdinateur.utilisateur.length>0)
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
  this.ModifyOrdinateurVisibile = !this.ModifyOrdinateurVisibile;
}

SaveChanges() {
  this.loading = true;

  const saveOrdinateurChanges = () => {
    this.ordinateurService.UpdateOrdinateur(this.ViewedOrdinateur.id, this.ViewedOrdinateur).subscribe({
      next: (response) => {
        // Find the existing Ordinateur in the list
        let OldOrdinateur = this.ordinateursList.find(item => item.numeroSerie === this.ViewedOrdinateur.numeroSerie);
        
        if (OldOrdinateur) {
          // Merge changes from ViewedOrdinateur into OldOrdinateur
          Object.assign(OldOrdinateur, this.ViewedOrdinateur);
        }
        this.ModifyOrdinateurVisibile = !this.ModifyOrdinateurVisibile;
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour',
          detail: "Les modifications ont été enregistrées avec succès."
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating ordinateur:', err);
        this.loading = false;
      }
    });
  };

  // Check if there's an image to update
  if (this.uploadimage.formData.has('file')) {
    this.uploadimage.uploadSignature().subscribe({
      next: (response) => {
        // Update image details
        this.ViewedOrdinateur.imageurl = response.secure_url;
        // Proceed to save changes after successful image upload
        saveOrdinateurChanges();
      },
      error: (err) => {
        console.error('Error updating image:', err);
        // Proceed to save changes even if the image upload fails
        saveOrdinateurChanges();
      }
    });
  } else {
    // Proceed to save changes if no image is provided
    saveOrdinateurChanges();
  }
}


DisableModify() {
  // Find the original ordinateur in the ordinateursList that matches the ViewedOrdinateur
  const OldOrdinateur = this.ordinateursList.find(item => item.id === this.ViewedOrdinateur.id);

  // Compare the ViewedOrdinateur with the found original ordinateur
  return JSON.stringify(this.ViewedOrdinateur) !== JSON.stringify(OldOrdinateur);
}




}
