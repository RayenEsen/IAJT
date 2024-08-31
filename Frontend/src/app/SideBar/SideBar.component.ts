import { Component, OnInit } from '@angular/core';
import { SessionService } from '../Utils/Session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-SideBar',
  templateUrl: './SideBar.component.html',
  styleUrls: ['./SideBar.component.css']
})
export class SideBarComponent implements OnInit {


  constructor(public sessionService : SessionService , private router : Router , private route: ActivatedRoute) { }


  items: MenuItem[] = [];


  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  
  ngOnInit() {
    const arrows = document.querySelectorAll(".arrow");
    arrows.forEach(arrow => {
      arrow.addEventListener("click", (e) => {
        const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle("showMenu");
        }
      });
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu");
    if (sidebar && sidebarBtn) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    } else {
      console.error("Sidebar or sidebar button not found");
    }
  
    this.items = this.router.url.split('/').filter(segment => segment).map(segment => ({ label: segment }));

  }

  
  LogOut()
  {
    this.sessionService.sessionDestroy();
    this.router.navigate(['']);
  }

  EditProfile()
  {
    this.router.navigate(['/Main/EditProfile']);
  }

  

}
