import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {FragranceListComponent} from "./pages/fragrance-list/fragrance-list.component";
import {MyFragrancesComponent} from "./pages/my-fragrances/my-fragrances.component";
import {ManageFragranceComponent} from "./pages/manage-fragrance/manage-fragrance.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: FragranceListComponent
      },
      {
        path: 'my-fragrances',
        component: MyFragrancesComponent
      },
      {
        path: 'manage',
        component: ManageFragranceComponent
      },
      {
        path: 'manage/:id',
        component: ManageFragranceComponent
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragranceRoutingModule { }
