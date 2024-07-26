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

import { EventBuysComponent } from './pages/event-buys/event-buys.component';
import { AuthGuard } from './auth/auth.guard';
import { MyEventsComponent } from './pages/my-events/my-events.component';


const routes: Routes = [
  {path: "", redirectTo: "selectInstitution", pathMatch: 'full'},
  {path: "selectInstitution", component: SelectInstitutionComponent},
  {path: "eventList", component: EventListComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "eventDetail", component: EventDetailComponent},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "myEvents", component: MyEventsComponent},
  {path: "viewInstitutions", component: ViewInstitutionsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: "viewCategories", component: ViewCategoriesComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: "adminPanel", component: PanelComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: 'eventBuys', component: EventBuysComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
