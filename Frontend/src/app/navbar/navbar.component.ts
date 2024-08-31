import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SessionService } from '../Utils/Session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig , public session : SessionService, public router : Router) { }

  items = [
    { label: 'Soon', icon: 'pi pi-home', routerLink: ['']  },
    { label: 'Soon', icon: 'pi pi-user', routerLink: [''] },
    { label: 'Soon', icon: 'pi pi-cog', routerLink: [''] },
    { label: 'Soon', icon: 'pi pi-cog', routerLink: [''] },
    // Add more menu items as needed
  ];
  
  ProfileItems = [
      {
          label: 'Documents',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-plus'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-search'
              }
          ]
      },
      {
          label: 'Profile',
          items: [
              {
                  label: 'Settings',
                  icon: 'pi pi-cog'
              },
              {
                label: 'Modifier',
                icon: 'pi pi-eye',
                command: () => this.router.navigate(['/Accueil/EditProfile'])
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.Logout() 
              }
          ]
      }
  ];

  ngOnInit() {
    this.primengConfig.ripple = true;
  }


  Logout()
  {
    this.session.sessionDestroy()
  }

}
