import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './SideBar/SideBar.component';
import { OrdinateursComponent } from './Ordinateurs/Ordinateurs.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { StepperModule } from 'primeng/stepper';
import { LoginComponent } from './Login/Login.component';
import { NotConnectedComponent } from './NotConnected/NotConnected.component';
import { PasswordModule } from 'primeng/password';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { TicketComponent } from './Ticket/Ticket.component';
import { RatingModule } from 'primeng/rating';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [																				
    AppComponent,
      SideBarComponent,
      OrdinateursComponent,
      LoginComponent,
      NotConnectedComponent,
      EditProfileComponent,
      NavbarComponent,
      TicketComponent
   ],
  imports: [
    BrowserModule,
    RatingModule,
    InputGroupModule,
    InputGroupAddonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    HttpClientModule, 
    FormsModule,
    StepperModule,
    PasswordModule,
    OverlayPanelModule,
    MessagesModule,
    RippleModule,
    BreadcrumbModule,
    PanelModule,
    SplitButtonModule,
    SpeedDialModule,
    ChartModule,
  ],
  providers: [MessageService , ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
