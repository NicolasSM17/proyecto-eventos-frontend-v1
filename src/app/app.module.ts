import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SelectInstitutionComponent } from './pages/select-institution/select-institution.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ViewInstitutionsComponent } from './admin/view-institutions/view-institutions.component';
import { ViewCategoriesComponent } from './admin/view-categories/view-categories.component';
import { EventBuysComponent } from './pages/event-buys/event-buys.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './admin/panel/panel.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { MatChipsModule } from '@angular/material/chips';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { UserAuthService } from './services/user-auth.service';
import { AddNewEventComponent } from './pages/add-new-event/add-new-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDirective } from './custom/directives/drag.directive';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { AddPaymentMethodComponent } from './pages/add-payment-method/add-payment-method.component';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { PublicationsOrganizationComponent } from './pages/publications-organization/publications-organization.component';
import { MyTournamentsComponent } from './pages/my-tournaments/my-tournaments.component';
import { AddNewTournamentComponent } from './pages/add-new-tournament/add-new-tournament.component';
import { NgbPopoverModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditMyEventComponent } from './pages/edit-my-event/edit-my-event.component';
import { OrganizerNavbarComponent } from './components/organizer-navbar/organizer-navbar.component';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { ConfirmationScreenComponent } from './pages/confirmation-screen/confirmation-screen.component';
import { PurchaseSummaryComponent } from './pages/purchase-summary/purchase-summary.component';
import { CodeVerificationComponent } from './pages/code-verification/code-verification.component';
import { ComboService } from 'src/app/services/combo.service';
import { EditComboModalComponent } from './pages/add-new-event/edit-combo-modal/edit-combo-modal.component';
import { ViewSportsComponent } from './admin/view-sports/view-sports.component';
import { BoostRequestsComponent } from './admin/boost-requests/boost-requests.component';
import { TicketRequestsComponent } from './admin/ticket-requests/ticket-requests.component';
import { ShowPaymentImagesDialogComponent } from './components/show-payment-images-dialog/show-payment-images-dialog.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    SelectInstitutionComponent,
    EventListComponent,
    EventDetailComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ForbiddenComponent,
    ViewInstitutionsComponent,
    ViewCategoriesComponent,
    EventBuysComponent,
    FooterComponent,
    PanelComponent,
    MyEventsComponent,
    CalendarComponent,
    StatisticsComponent,
    AddNewEventComponent,
    DragDirective,
    PaymentMethodsComponent,
    AddPaymentMethodComponent,
    ManageAccountComponent,
    PublicationsOrganizationComponent,
    MyTournamentsComponent,
    AddNewTournamentComponent,
    EditMyEventComponent,
    OrganizerNavbarComponent,
    CustomNavbarComponent,
    ConfirmationScreenComponent,
    PurchaseSummaryComponent,
    CodeVerificationComponent,
    EditComboModalComponent,
    ViewSportsComponent,
    BoostRequestsComponent,
    TicketRequestsComponent,
    ShowPaymentImagesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatChipsModule,
    NgbModule,
    NgbPopoverModule,
    SweetAlert2Module,
    MatDialogModule
  ],
  providers: [
    ComboService,
    {provide: LOCALE_ID, useValue: 'es'},
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
