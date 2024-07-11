import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectInstitutionComponent } from './pages/select-institution/select-institution.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ViewInstitutionsComponent } from './admin/view-institutions/view-institutions.component';
import { ViewCategoriesComponent } from './admin/view-categories/view-categories.component';
import { PanelComponent } from './admin/panel/panel.component';

const routes: Routes = [
  {path: "", redirectTo: "selectInstitution", pathMatch: 'full'},
  {path: "selectInstitution", component: SelectInstitutionComponent},
  {path: "eventList", component: EventListComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "eventDetail", component: EventDetailComponent},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "viewInstitutions", component: ViewInstitutionsComponent},
  {path: "viewCategories", component: ViewCategoriesComponent},
  {path: "adminPanel", component: PanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
