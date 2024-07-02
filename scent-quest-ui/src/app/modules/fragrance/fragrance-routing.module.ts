import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FragranceListComponent} from "./pages/fragrance-list/fragrance-list.component";
import {MyFragrancesComponent} from "./pages/my-fragrances/my-fragrances.component";
import {ManageFragranceComponent} from "./pages/manage-fragrance/manage-fragrance.component";
import {LeaveFeedbackComponent} from "./pages/leave-feedback/leave-feedback.component";
import {authGuard} from "../../services/guard/auth.guard";
import {AdminGuard} from "../../services/admin/admin.guard";
import {MyFavoriteListComponent} from "./pages/my-favorite-list/my-favorite-list.component";
import {ManageFragranceAdminComponent} from "./pages/manage-fragrance-admin/manage-fragrance-admin.component";
import {AdminDashboardComponent} from "./pages/admin-dashboard/admin-dashboard.component";
import {FragrancePageComponent} from "./pages/fragrance-page/fragrance-page.component";
import {MyOwnedListComponent} from "./pages/my-owned-list/my-owned-list.component";
import {UserProfileMemberComponent} from "./pages/user-profile-member/user-profile-member.component";
import {LoyaltyPageComponent} from "./pages/loyalty-page/loyalty-page.component";
import {FragranceFinderComponent} from "./pages/fragrance-finder/fragrance-finder.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: FragranceListComponent,
        canActivate: []
      },
      {
        path: 'my-fragrances',
        component: MyFragrancesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageFragranceComponent,
        canActivate: [authGuard, AdminGuard]
      },
      {
        path: 'manage/:id',
        component: ManageFragranceComponent,
        canActivate: [authGuard, AdminGuard]
      },
      {
        path: 'page/:id',
        component: FragrancePageComponent
      },
      {
        path: 'member/:id',
        component: UserProfileMemberComponent,
      },
      {
        path: 'review/:id',
        component: LeaveFeedbackComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-favorites',
        component: MyFavoriteListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'owned-fragrances',
        component: MyOwnedListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'admin-manage',
        component: ManageFragranceAdminComponent,
        canActivate: [authGuard, AdminGuard]
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard, AdminGuard]
      },
      {
        path: 'loyalty',
        component: LoyaltyPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'fragrance-finder',
        component: FragranceFinderComponent,
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
