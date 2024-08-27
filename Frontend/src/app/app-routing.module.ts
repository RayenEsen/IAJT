import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotConnectedComponent } from './NotConnected/NotConnected.component';
import { LoginComponent } from './Login/Login.component';
import { SideBarComponent } from './SideBar/SideBar.component';
import { OrdinateursComponent } from './Ordinateurs/Ordinateurs.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './EditProfile/EditProfile.component';

const routes: Routes = [
  {
    path: '',
    component: NotConnectedComponent,
    children: [
      { path: '', component: LoginComponent } 
    ]
  },
  {
    path: 'Main',
    component: SideBarComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'Ordinateurs', component: OrdinateursComponent }, 
      { path: 'EditProfile', component: EditProfileComponent }, 
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
