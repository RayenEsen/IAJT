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
    this.sessionService.sessionStart(this.user);
    this.messageService.add({ severity: 'success', summary: 'Connexion réussie', detail: 'Bonjour.' });
    this.router.navigate(['Main/Ordinateurs']);
  }

  Register()
  {
    if(this.user.password!=this.SecondPassword)
      {
        console.log("test")
        this.messageService.add({ severity: 'error', summary: 'Confirmation', detail: 'Password and Confirm Password are not the same.' });
        return;
      }
    else
    {
      this.SwitchDiv()
    }
  }

  LoginVisible : boolean = true;
  RegisterVisible : boolean = false;
  SwitchDiv()
  {
    this.LoginVisible= !this.LoginVisible
    this.RegisterVisible = !this.RegisterVisible
  }

}
