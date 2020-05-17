import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoadwayCalculatorComponent } from './roadway-calculator/roadway-calculator.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  {path: 'roadway', component: RoadwayCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
