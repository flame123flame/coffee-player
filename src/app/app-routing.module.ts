import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { ComponentsModule } from './component/components.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginGuardService } from './auth/login-guard.service';
import { Register001Component } from './page/register/register001/register001.component';
import { RegisterUserComponent } from './page/register-user/register-user.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';



const routes: Routes = [
  // like login
  {
    path: 'register-user',
    component: RegisterUserComponent,
    // canActivate: [LoginGuardService]
  },
  {
    path: 'invitation-register-user',
    component: RegisterUserComponent,
    // canActivate: [LoginGuardService]
  },

  // main page
  {
    path: '',
    loadChildren: () => import('./common/layout/layout.module').then(m => m.LayoutModule),
    // canActivate: [AuthGuardService],
  },

  {
    path: 'login',
    redirectTo: '/register-user',
    pathMatch: 'full'
  },
  {
    path: 'register',
    redirectTo: '/invitation-register-user',
    pathMatch: 'full'
  },
  { path: '**', component: RegisterUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' }),
    ComponentsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
