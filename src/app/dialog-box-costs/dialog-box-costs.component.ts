import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RoadwayBussineRule } from '../models/bre/roadwaybussinerule';
import { RoadwayService } from '../services/roadway.service';

 export interface ruleCosts {
  country: string;
  transport: string;
  distance: number;
  weight: number;
  workTime: number;
  averageConsumption: number;
  rateExchange: number;
}

@Component({
  selector: 'app-dialog-box-costs',
  templateUrl: './dialog-box-costs.component.html',
  styleUrls: ['./dialog-box-costs.component.css']
})
export class DialogBoxCostsComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DialogBoxCostsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ruleCosts) {
    this.local_data = {...data};
    this.action = this.local_data.action;
    console.log(" COSTS ", this.local_data.country);
    console.log(" COSTS ", this.local_data.transport);
  }

  findRoadwayBRE(){
      const roadway_bre = "Roadway-SouthAmerica-BRE";
      var roadwayObjBRE = {} as RoadwayBussineRule;
      this.roadwayService.getRoadwayBRE(roadway_bre).subscribe((roadwayResponse: Response) =>{
        var resSTR = JSON.stringify(roadwayResponse.body);
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
    });
      this.roadwayObjBRE = roadwayObjBRE;
  }


  doAction(){

    console.log(" TESTE distance ", this.local_data.distance_cost);
    console.log(" TESTE fuel ", this.local_data.fuel_average_cost);

    if(this.local_data.country == 'Colombia'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Colombia.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Colombia.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Colombia.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Colombia.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Colombia.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Colombia.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Colombia.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Colombia.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Colombia.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Colombia.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Colombia.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Colombia.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Colombia.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Colombia.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Colombia.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Colombia.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Colombia.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Colombia.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Colombia.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Colombia.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Colombia.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Colombia.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Colombia.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Colombia.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Colombia.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Venezuela
    else if(this.local_data.country == 'Venezuela'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Venezuela.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Venezuela.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Venezuela.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Venezuela.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Venezuela.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Venezuela.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Venezuela.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Venezuela.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Venezuela.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Venezuela.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Venezuela.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Venezuela.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Venezuela.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Venezuela.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Venezuela.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Venezuela.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Venezuela.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Venezuela.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Venezuela.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Venezuela.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Ecuador
    else if(this.local_data.country == 'Ecuador'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Ecuador.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Ecuador.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Ecuador.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Ecuador.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Ecuador.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Ecuador.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Ecuador.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Ecuador.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Ecuador.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Ecuador.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Ecuador.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Ecuador.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Ecuador.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Ecuador.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
       this.roadwayObjBRE.ruleCosts.Ecuador.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Ecuador.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Ecuador.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Ecuador.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
       this.roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Argentina
    else if(this.local_data.country == 'Argentina'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Argentina.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Argentina.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Argentina.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Argentina.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Argentina.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Argentina.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Argentina.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Argentina.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Argentina.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Argentina.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Argentina.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Argentina.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Argentina.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Argentina.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Argentina.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Argentina.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Argentina.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Argentina.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Argentina.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Argentina.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Argentina.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Argentina.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Argentina.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Argentina.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Argentina.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Uruguay
    else if(this.local_data.country == 'Uruguay'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Uruguay.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Uruguay.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Uruguay.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Uruguay.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Uruguay.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Uruguay.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Uruguay.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Uruguay.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Uruguay.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Uruguay.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Uruguay.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Uruguay.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Uruguay.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Uruguay.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Uruguay.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Uruguay.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Uruguay.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Uruguay.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Uruguay.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Uruguay.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Brazil
    else if(this.local_data.country == 'Brazil'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Brazil.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Brazil.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Brazil.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Brazil.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Brazil.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Brazil.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Brazil.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Brazil.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Brazil.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Brazil.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Brazil.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Brazil.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Brazil.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Brazil.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Brazil.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Brazil.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Brazil.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Brazil.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Brazil.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Brazil.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Brazil.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Brazil.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Brazil.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Brazil.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Brazil.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Guyana
    else if(this.local_data.country == 'Guyana'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Guyana.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Guyana.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Guyana.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Guyana.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Guyana.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Guyana.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Guyana.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Guyana.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Guyana.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Guyana.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Guyana.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Guyana.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Guyana.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Guyana.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Guyana.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Guyana.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Guyana.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Guyana.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Guyana.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Guyana.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Guyana.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Guyana.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Guyana.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Guyana.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Guyana.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Suriname
    else if(this.local_data.country == 'Suriname'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Suriname.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Suriname.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Suriname.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Suriname.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Suriname.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Suriname.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Suriname.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Suriname.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Suriname.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Suriname.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Suriname.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Suriname.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Suriname.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Suriname.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Suriname.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Suriname.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Suriname.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Suriname.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Suriname.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Suriname.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Suriname.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Suriname.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Suriname.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Suriname.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Suriname.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Chile
    else if(this.local_data.country == 'Chile'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Chile.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Chile.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Chile.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Chile.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Chile.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Chile.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Chile.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Chile.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Chile.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Chile.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Chile.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Chile.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Chile.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Chile.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Chile.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Chile.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Chile.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Chile.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Chile.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Chile.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Chile.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Chile.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Chile.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Chile.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Chile.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Bolivia
    else if(this.local_data.country == 'Bolivia'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Bolivia.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Bolivia.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Bolivia.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Bolivia.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Bolivia.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Bolivia.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Bolivia.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Bolivia.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Bolivia.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Bolivia.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Bolivia.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Bolivia.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Bolivia.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Bolivia.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Bolivia.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Bolivia.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Bolivia.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Bolivia.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Bolivia.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Bolivia.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    // Paraguay
    else if(this.local_data.country == 'Paraguay'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Paraguay.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Paraguay.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Paraguay.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Paraguay.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Paraguay.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Paraguay.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Paraguay.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Paraguay.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Paraguay.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Paraguay.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Paraguay.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Paraguay.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Paraguay.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Paraguay.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Paraguay.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Paraguay.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Paraguay.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Paraguay.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Paraguay.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Paraguay.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
     // Peru
    else if(this.local_data.country == 'Peru'){
      if(this.local_data.transport == this.walking){
        this.roadwayObjBRE.ruleCosts.Peru.Walking.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Peru.Walking.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Peru.Walking.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Peru.Walking.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Peru.Walking.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.bicycle){
        this.roadwayObjBRE.ruleCosts.Peru.Bicycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Peru.Bicycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Peru.Bicycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Peru.Bicycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Peru.Bicycle.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.car){
        this.roadwayObjBRE.ruleCosts.Peru.Car.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Peru.Car.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Peru.Car.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Peru.Car.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Peru.Car.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.truck){
        this.roadwayObjBRE.ruleCosts.Peru.Truck.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Peru.Truck.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Peru.Truck.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Peru.Truck.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Peru.Truck.worktime_cost = this.local_data.workTime;
      }
      else if(this.local_data.transport == this.motorcycle){
        this.roadwayObjBRE.ruleCosts.Peru.Motorcycle.average_consumption_cost = this.local_data.averageConsumption;
        this.roadwayObjBRE.ruleCosts.Peru.Motorcycle.distance_cost = this.local_data.distance;
        this.roadwayObjBRE.ruleCosts.Peru.Motorcycle.rate_exchange = this.local_data.rateExchange;
        this.roadwayObjBRE.ruleCosts.Peru.Motorcycle.weight_cost = this.local_data.weight;
        this.roadwayObjBRE.ruleCosts.Peru.Motorcycle.worktime_cost = this.local_data.workTime;
      }
    }
    var resSTR = JSON.stringify(this.roadwayObjBRE);
    this.updateRoadwayBRE(resSTR);
  }

  ngOnInit(): void {
    this.findRoadwayBRE();
  }

   closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  updateRoadwayBRE(roadwaybre: string){
    this.roadwayService.postRoadwayBRE(roadwaybre).subscribe((response: Response) =>{
      this.closeDialog();
    });
  }
}
