import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoadwayCalculatorComponent } from './roadway-calculator/roadway-calculator.component';
import { RoadwayParameterComponent } from './roadway-parameter/roadway-parameter.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  {path: 'roadway-simulation', component: RoadwayCalculatorComponent},
  {path: 'roadway-parameter', component: RoadwayParameterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
