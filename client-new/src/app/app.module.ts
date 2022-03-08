import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './comps/home/home.component';
import { NotesComponent } from './comps/notes/notes.component';
import { SsComponent } from './comps/ss/ss.component';
import { ArchieveComponent } from './comps/archieve/archieve.component';
import { TrashComponent } from './trash/trash.component';
import { NavigationComponent } from './navigation/navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RemainderComponent } from './comps/remainder/remainder.component';
import { EditLabelComponent } from './comps/edit-label/edit-label.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AppServiceService } from './services/app-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotesComponent,
    SsComponent,
    ArchieveComponent,
    TrashComponent,
    NavigationComponent,
    RemainderComponent,
    EditLabelComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent
  ],
  entryComponents : [EditLabelComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatSliderModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
