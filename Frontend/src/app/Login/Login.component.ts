import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/User';
import { SessionService } from '../Utils/Session.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../Service/User.service';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService : UserService,private sessionService: SessionService , private messageService: MessageService ,  private router: Router) {}

  user : User = new User;
  SecondPassword : String = '';



  ngOnInit() {
  }

  Login() {
    const {email , password} = this.user
    if ( !email || !password)
    {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires.' });
      return;
    }
    this.sessionService.sessionStart(this.user);
    this.messageService.add({ severity: 'success', summary: 'Connexion réussie', detail: 'Bonjour.' });
    this.router.navigate(['Main/Ordinateurs']);
  }

// Function to validate user inputs
validateUserInputs(): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if all fields are filled
  if (!this.user.nom || !this.user.prenom || !this.user.email || !this.user.password || !this.SecondPassword) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires.' });
    return false;
  }

  // Check if email format is valid
  if (!emailPattern.test(this.user.email)) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez entrer une adresse email valide.' });
    return false;
  }

  // Check if password and confirmation match
  if (this.user.password !== this.SecondPassword) {
    this.messageService.add({ severity: 'error', summary: 'Erreur de confirmation', detail: 'Le mot de passe et la confirmation ne correspondent pas.' });
    return false;
  }

  return true;
}

// Function to handle user registration
Register() {
  // Validate user inputs
  if (!this.validateUserInputs()) {
    return; // Exit if validation fails
  }

  // Subscribe to the registerUser method
  this.userService.registerUser(this.user).subscribe({
    next: (registeredUser) => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Inscription réussie.' });
      // Optionally clear the user object or reset the form
      this.user = new User();
      this.SwitchDiv(); // Call any other function if needed
    },
    error: (error) => {
      // Optionally handle the error without extensive logging
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'inscription.' });
    }
  });
}

  
  

  LoginVisible : boolean = true;
  RegisterVisible : boolean = false;
  SwitchDiv()
  {
    this.LoginVisible= !this.LoginVisible
    this.RegisterVisible = !this.RegisterVisible
  }

}
