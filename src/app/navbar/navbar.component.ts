import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  items = [
    { label: 'Home', icon: 'pi pi-home', routerLink: ['']  },
    { label: 'Profile', icon: 'pi pi-user', routerLink: ['/Main/EditProfile'] },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: [''] }
    // Add more menu items as needed
  ];
  


  ngOnInit() {
  }

}
