import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectInstitutionComponent } from './pages/select-institution/select-institution.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ViewInstitutionsComponent } from './admin/view-institutions/view-institutions.component';
import { ViewCategoriesComponent } from './admin/view-categories/view-categories.component';
import { PanelComponent } from './admin/panel/panel.component';

import { EventBuysComponent } from './pages/event-buys/event-buys.component';
import { AuthGuard } from './auth/auth.guard';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { AddNewEventComponent } from './pages/add-new-event/add-new-event.component';
import { EventoResolveService } from './resolvers/evento-resolve.service';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { AddPaymentMethodComponent } from './pages/add-payment-method/add-payment-method.component'; 
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { PublicationsOrganizationComponent } from './pages/publications-organization/publications-organization.component';
import { MyTournamentsComponent } from './pages/my-tournaments/my-tournaments.component';
import { AddNewTournamentComponent } from './pages/add-new-tournament/add-new-tournament.component';
import { EditMyEventComponent } from './pages/edit-my-event/edit-my-event.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { CalendarComponent } from './pages/calendar/calendar.component';


const routes: Routes = [
  {path: "", redirectTo: "selectInstitution", pathMatch: 'full'},
  {path: "selectInstitution", component: SelectInstitutionComponent},
  {path: "eventList/:institucionId", component: EventListComponent, resolve: {eventos: EventoResolveService}},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "eventDetail/:eventoId", component: EventDetailComponent, resolve: {eventos: EventoResolveService}},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "myEvents", component: MyEventsComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: "viewInstitutions", component: ViewInstitutionsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: "viewCategories", component: ViewCategoriesComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: "adminPanel", component: PanelComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path: 'eventBuys', component: EventBuysComponent },
  {path: 'addNewEvent', component: AddNewEventComponent, data:{roles:['USER']}},
  {path: 'paymentMethods', component: PaymentMethodsComponent, data:{roles:['USER']}},
  {path: 'add-payment-method', component: AddPaymentMethodComponent },
  {path: 'manageAccount', component: ManageAccountComponent},
  {path: 'publicationsOrganization', component: PublicationsOrganizationComponent, data:{roles:['USER']}},
  {path: "myTournaments", component: MyTournamentsComponent},
  {path: 'addNewTournament', component: AddNewTournamentComponent, data:{roles:['USER']}},
  {path: 'eventBuys', component: EventBuysComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'addNewEvent', component: AddNewEventComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'paymentMethods', component: PaymentMethodsComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'add-payment-method', component: AddPaymentMethodComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'manageAccount', component: ManageAccountComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'editMyEvent/:eventoId', component: EditMyEventComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'mystatistics', component: StatisticsComponent, canActivate:[AuthGuard], data:{roles:['USER']}},
  {path: 'calendar', component: CalendarComponent, canActivate:[AuthGuard], data:{roles:['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
