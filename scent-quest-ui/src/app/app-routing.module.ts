import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {authGuard} from "./services/guard/auth.guard";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";
import {ResetPasswordComponentComponent} from "./pages/reset-password-component/reset-password-component.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fragrances',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponentComponent
  },
  {
    path: 'fragrances',
    loadChildren: () => import('./modules/fragrance/fragrance.module').then(m => m.FragranceModule),
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
