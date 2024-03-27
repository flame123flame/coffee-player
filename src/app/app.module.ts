import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './page/landing/landing.component';
import { MainComponent } from './page/main/main.component';
import { ComponentsModule } from './component/components.module';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { LoginGuardService } from './auth/login-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './page/register-user/register-user.component';
import { DepositMoneyComponent } from './page/deposit-money/deposit-money.component';
import { JustLogicComponent } from './page/just-logic/just-logic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './material-module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ChangePhoneComponent } from './page/change-phone/change-phone.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { A2hsService } from './a2hs.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LotteryResultsOhterComponent } from './page/lottery-results-ohter/lottery-results-ohter.component';
import { MainPipeModule } from './common/pipe/main-pipe.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MainComponent,
    RegisterUserComponent,
    DepositMoneyComponent,
    JustLogicComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ChangePhoneComponent,
    PageNotFoundComponent,
    LotteryResultsOhterComponent,

  ],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    MainPipeModule,
    MatSidenavModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    HttpService,
    AuthGuardService,
    LoginGuardService,
    AuthService,
    DatePipe,
    A2hsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
