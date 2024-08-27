import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/User';
import { SessionService } from '../Utils/Session.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService , private messageService: MessageService ,  private router: Router) {}

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

  Register() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!this.user.nom || !this.user.prenom || !this.user.email || !this.user.password || !this.SecondPassword) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires.' });
      return;
    }
  
    if (!emailPattern.test(this.user.email)) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez entrer une adresse email valide.' });
      return;
    }
  
    if (this.user.password !== this.SecondPassword) {
      this.messageService.add({ severity: 'error', summary: 'Erreur de confirmation', detail: 'Le mot de passe et la confirmation ne correspondent pas.' });
      return;
    }
  
    this.user = new User();
    this.SwitchDiv();
  }
  
  

  LoginVisible : boolean = true;
  RegisterVisible : boolean = false;
  SwitchDiv()
  {
    this.LoginVisible= !this.LoginVisible
    this.RegisterVisible = !this.RegisterVisible
  }

}
