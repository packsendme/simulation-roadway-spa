import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RoadwayBussineRule } from '../models/bre/roadwaybussinerule';
import { RoadwayService } from '../services/roadway.service';

export interface ruleInstance {
  provider: string;
  weight: string;
  distance: string;
 }

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit{

  action:string;
  local_data:any;
  roadwayObjBRE: RoadwayBussineRule = null;

  // Constants
  walking = 'Walking';
  motorcycle = 'Motorcycle';
  car = 'Car';
  truck = 'Truck';
  bicycle = 'Bicycle';


  constructor(
    private roadwayService: RoadwayService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ruleInstance) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if(this.local_data.provider == this.walking){
      this.roadwayObjBRE.ruleInstance.Walking.distance_max = this.local_data.distance;
      this.roadwayObjBRE.ruleInstance.Walking.weight_max = this.local_data.weight;
      var resSTR = JSON.stringify(this.roadwayObjBRE);
      console.log("Walking-0001",resSTR);
      this.updateRoadwayBRE(resSTR);
    }
    else if(this.local_data.provider == this.bicycle){
      this.roadwayObjBRE.ruleInstance.Bicycle.distance_max = this.local_data.distance;
      this.roadwayObjBRE.ruleInstance.Bicycle.weight_max = this.local_data.weight;
      var resSTR = JSON.stringify(this.roadwayObjBRE);
      this.updateRoadwayBRE(resSTR);
    }
    else if(this.local_data.provider == this.car){
      this.roadwayObjBRE.ruleInstance.Car.distance_max = this.local_data.distance;
      this.roadwayObjBRE.ruleInstance.Car.weight_max = this.local_data.weight;
      var resSTR = JSON.stringify(this.roadwayObjBRE);
      this.updateRoadwayBRE(resSTR);
    }
    else if(this.local_data.provider == this.truck){
      this.roadwayObjBRE.ruleInstance.Truck.distance_max = this.local_data.distance;
      this.roadwayObjBRE.ruleInstance.Truck.weight_max = this.local_data.weight;
      var resSTR = JSON.stringify(this.roadwayObjBRE);
      this.updateRoadwayBRE(resSTR);
    }
    else if(this.local_data.provider == this.motorcycle){
      this.roadwayObjBRE.ruleInstance.Motorcycle.distance_max = this.local_data.distance;
      this.roadwayObjBRE.ruleInstance.Motorcycle.weight_max = this.local_data.weight;
      var resSTR = JSON.stringify(this.roadwayObjBRE);
      this.updateRoadwayBRE(resSTR);
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  findRoadwayBRE(){
    const roadway_bre = "Roadway-SouthAmerica-BRE";
    this.roadwayService.getRoadwayBRE(roadway_bre).subscribe((roadwayResponse: Response) =>{
      
    var resSTR = JSON.stringify(roadwayResponse.body);
    var roadwayObjBRE = {} as RoadwayBussineRule;

    var obj = JSON.parse(resSTR, function (key, value){
      if (key == "name_rule") {
        roadwayObjBRE.name_rule = value;
        return value;
      }
      else if (key == "date_creation") {
        roadwayObjBRE.date_creation = value;
        return value;
      }
      else if (key == "rate_reshipping") {
        roadwayObjBRE.rate_reshipping = value;
        return value;
      }
      else if (key == "status") {
        roadwayObjBRE.status = value;
        return value;
      }
      else if(key == "ruleInstance"){
        roadwayObjBRE.ruleInstance = value;
        return value;
      }
      else if(key == "ruleCosts"){
        roadwayObjBRE.ruleCosts = value;
        return value;
      }
      else {
        console.log("NO");
        return value;
      }
    });
    this.roadwayObjBRE = roadwayObjBRE;
    console.log("roadwayObjBRE", roadwayObjBRE);
    });
  }

  ngOnInit(): void {
    this.findRoadwayBRE();
  }

  updateRoadwayBRE(roadwaybre: string){
    this.roadwayService.postRoadwayBRE(roadwaybre).subscribe((response: Response) =>{
      this.closeDialog();
    });
  }

}