import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FragranceRoutingModule } from './fragrance-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { FragranceListComponent } from './pages/fragrance-list/fragrance-list.component';
import { FragranceCardComponent } from './components/fragrance-card/fragrance-card.component';
import { RatingComponent } from './components/rating/rating.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    FragranceListComponent,
    FragranceCardComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    FragranceRoutingModule
  ]
})
export class FragranceModule { }
