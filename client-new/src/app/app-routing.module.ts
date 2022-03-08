import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ArchieveComponent } from './comps/archieve/archieve.component';
import { EditLabelComponent } from './comps/edit-label/edit-label.component';
import { HomeComponent } from './comps/home/home.component';
import { NotesComponent } from './comps/notes/notes.component';
import { RemainderComponent } from './comps/remainder/remainder.component';
import { SsComponent } from './comps/ss/ss.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrashComponent } from './trash/trash.component';


const routes: Routes = [
  {
    path: '', component: NavigationComponent,
    children: [
      {
        path: '', component: HomeComponent,
        children: [
          { path: 'notes', component: NotesComponent },
          { path: 'remainder', component: RemainderComponent },
          { path: 'editlabel', component: EditLabelComponent },
          { path: 'ss', component: SsComponent },
          { path: 'arch', component: ArchieveComponent }
        ]
      },
      { path: 'trash', component: TrashComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgot', component: ForgetpasswordComponent},
  { path: 'change', component: ChangepasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
