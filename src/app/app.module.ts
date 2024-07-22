import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule  } from '@angular/platform-browser';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectInstitutionComponent } from './pages/select-institution/select-institution.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ViewInstitutionsComponent } from './admin/view-institutions/view-institutions.component';
import { ViewCategoriesComponent } from './admin/view-categories/view-categories.component';

//import 'hammerjs';
import { EventBuysComponent } from './pages/event-buys/event-buys.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './admin/panel/panel.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';



declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    // override hammerjs default configuration
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL }
  };
}


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
    StatisticsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HammerModule
  ],
  providers: [
    /*
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
