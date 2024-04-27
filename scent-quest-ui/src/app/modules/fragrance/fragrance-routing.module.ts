import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FragranceListComponent} from "./pages/fragrance-list/fragrance-list.component";
import {MyFragrancesComponent} from "./pages/my-fragrances/my-fragrances.component";
import {ManageFragranceComponent} from "./pages/manage-fragrance/manage-fragrance.component";
import {LeaveFeedbackComponent} from "./pages/leave-feedback/leave-feedback.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: FragranceListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-fragrances',
        component: MyFragrancesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageFragranceComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:id',
        component: ManageFragranceComponent,
        canActivate: [authGuard]
      },
      {
        path: 'review/:id',
        component: LeaveFeedbackComponent,
        canActivate: [authGuard]
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragranceRoutingModule { }
