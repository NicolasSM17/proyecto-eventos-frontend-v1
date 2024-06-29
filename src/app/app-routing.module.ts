import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectInstitutionComponent } from './pages/select-institution/select-institution.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

const routes: Routes = [
  {path: "", redirectTo: "selectInstitution", pathMatch: 'full'},
  {path: "selectInstitution", component: SelectInstitutionComponent},
  {path: "eventList", component: EventListComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "eventDetail", component: EventDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
