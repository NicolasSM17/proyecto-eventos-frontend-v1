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
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from "@angular/material/grid-list";
import { ForbiddenComponent } from './forbidden/forbidden.component';
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
    DragDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatChipsModule
  ],
  providers: [
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
