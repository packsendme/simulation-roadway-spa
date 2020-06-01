import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { RoadwayService } from '../services/roadway.service';
import { RoadwayBussineRule } from '../models/bre/roadway/roadwaybussinerule';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogBoxCostsComponent } from '../dialog-box-costs/dialog-box-costs.component';
import { TollsfuelBRE } from '../models/bre/tollsFuel/tollsfuel-bre';
import { DialogBoxTollsfuelComponent } from '../dialog-box-tollsfuel/dialog-box-tollsfuel.component';

export interface ruleInstance {
  provider: string;
  weight: string;
  distance: string;
  unity_measurement_weight: string;
  unity_measurement_distance: string;
 }
 
 export interface ruleCosts {
  country: string;
  transport: string;
  distance: number;
  weight: number;
  workTime: number;
  averageConsumption: number;
  rateExchange: number;
  currentExchange: String;
}

export interface tollsFuelCosts {
  country: string;
  tollsPrice: number;
  fuelGasolinePrice: number;
  fuelDieselPrice: number;
  currentExchange: string;
}

interface countryCosts {
  country: string;
  instanceCosts_data: ruleCosts[];
}

interface tollsFuelCountryCosts {
  country: string;
  tollsFuelCosts: tollsFuelCosts[];
}


interface Country {
  value: string;
}

@Component({
  selector: 'app-roadway-parameter',
  templateUrl: './roadway-parameter.component.html',
  styleUrls: ['./roadway-parameter.component.css']
})
export class RoadwayParameterComponent implements OnInit {


  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(private roadwayService: RoadwayService, public dialog: MatDialog) { }
  selected_country: string;
  roadwayObjBRE = {} as RoadwayBussineRule;
  tollsFuelObjBRE = {} as TollsfuelBRE;
  
  //Data
  instanceRule_data: ruleInstance[];
  instanceCountryCosts_data: countryCosts[];
  instanceTollsFuel_data: tollsFuelCountryCosts[];

  // Instance-Country
  instanceCosts_Colombia: ruleCosts[];
  instanceCosts_Venezuela: ruleCosts[];
  instanceCosts_Ecuador: ruleCosts[];
  instanceCosts_Argentina: ruleCosts[];
  instanceCosts_Uruguay: ruleCosts[];
  instanceCosts_Brazil: ruleCosts[];
  instanceCosts_Guyana: ruleCosts[];
  instanceCosts_Suriname: ruleCosts[];
  instanceCosts_Chile: ruleCosts[];
  instanceCosts_Bolivia: ruleCosts[];
  instanceCosts_Paraguay: ruleCosts[];
  instanceCosts_Peru: ruleCosts[];

    // TollsFuel-Country
  instanceTollFuel_Colombia: tollsFuelCosts[];
  instanceTollFuel_Venezuela: tollsFuelCosts[];
  instanceTollFuel_Ecuador: tollsFuelCosts[];
  instanceTollFuel_Argentina: tollsFuelCosts[];
  instanceTollFuel_Uruguay: tollsFuelCosts[];
  instanceTollFuel_Brazil: tollsFuelCosts[];
  instanceTollFuel_Guyana: tollsFuelCosts[];
  instanceTollFuel_Suriname: tollsFuelCosts[];
  instanceTollFuel_Chile: tollsFuelCosts[];
  instanceTollFuel_Bolivia: tollsFuelCosts[];
  instanceTollFuel_Paraguay: tollsFuelCosts[];
  instanceTollFuel_Peru: tollsFuelCosts[];
    
  //DataSource
  instanceRuleDS = [];
  instanceCostsCountryDS = [];
  instanceTollsFuelDS = [];
 

  // Display-Columns
  instanceRuleColumns: string[] = ['transporteinstance', 'distance','distanceD','Fk1', 'weight','medidaW','Fk1', 'actionInstance'];
  instanceCostsColumnsDisplay: string[] = ['transportecosts','distancecosts', 'weightcosts', 'workTime', 'averageConsumption', 'rateExchange','actionCosts'];
  instanceTollsFuelColumns: string[] = ['tollsPrice','fuelGasolinePrice', 'fuelDieselPrice','actionTollsFuel'];

  contries: Country[] = [
    {value: 'Colombia'},
    {value: 'Venezuela'},
    {value: 'Ecuador'},
    {value: 'Argentina'},
    {value: 'Uruguay'},
    {value: 'Brazil'},
    {value: 'Guyana'},
    {value: 'Suriname'},
    {value: 'Chile'},
    {value: 'Bolivia'},
    {value: 'Paraguay'},
    {value: 'Peru'}
  ]

  ngOnInit(): void {
    this.FindRoadwayBRE()
  }

  private FindRoadwayBRE(): RoadwayBussineRule{
    const roadway_bre = "Roadway-SouthAmerica-BRE";
    var roadwayObjBRE = {} as RoadwayBussineRule;

    this.roadwayService.getRoadwayBRE(roadway_bre)
      .subscribe((roadwayResponse: Response) =>{

        var resSTR = JSON.stringify(roadwayResponse.body);
        console.log(" INFORMACAO:  ",resSTR);

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
          if(key == "ruleInstance"){
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
        this.instanceRule_data = [
          {provider: 'Walking', weight: roadwayObjBRE.ruleInstance.Walking.weight_max, distance: roadwayObjBRE.ruleInstance.Walking.distance_max, 
          unity_measurement_distance: roadwayObjBRE.ruleInstance.Walking.unity_measurement_distance, 
          unity_measurement_weight: roadwayObjBRE.ruleInstance.Walking.unity_measurement_weight},
          {provider: 'Motorcycle', weight: roadwayObjBRE.ruleInstance.Motorcycle.weight_max, distance: roadwayObjBRE.ruleInstance.Motorcycle.distance_max,
          unity_measurement_distance: roadwayObjBRE.ruleInstance.Motorcycle.unity_measurement_distance, 
          unity_measurement_weight: roadwayObjBRE.ruleInstance.Motorcycle.unity_measurement_weight},
          {provider: 'Car', weight: roadwayObjBRE.ruleInstance.Car.weight_max, distance: roadwayObjBRE.ruleInstance.Car.distance_max,
          unity_measurement_distance: roadwayObjBRE.ruleInstance.Car.unity_measurement_distance, 
          unity_measurement_weight: roadwayObjBRE.ruleInstance.Car.unity_measurement_weight},
          {provider: 'Truck', weight: roadwayObjBRE.ruleInstance.Truck.weight_max, distance: roadwayObjBRE.ruleInstance.Truck.distance_max,
          unity_measurement_distance: roadwayObjBRE.ruleInstance.Truck.unity_measurement_distance, 
          unity_measurement_weight: roadwayObjBRE.ruleInstance.Truck.unity_measurement_weight},
          {provider: 'Bicycle', weight: roadwayObjBRE.ruleInstance.Bicycle.weight_max, distance: roadwayObjBRE.ruleInstance.Bicycle.distance_max,
          unity_measurement_distance: roadwayObjBRE.ruleInstance.Bicycle.unity_measurement_distance, 
          unity_measurement_weight: roadwayObjBRE.ruleInstance.Bicycle.unity_measurement_weight},
        ];

        this.instanceCosts_Argentina = [
          // ARGENTINA
          {country:'Argentina', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Argentina.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Argentina.Bicycle.weight_cost,
          workTime: roadwayObjBRE.ruleCosts.Argentina.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Argentina.Bicycle.average_consumption_cost, 
          rateExchange:roadwayObjBRE.ruleCosts.Argentina.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Argentina.Bicycle.current_exchange},
          {country:'Argentina', transport:'Car', distance:roadwayObjBRE.ruleCosts.Argentina.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Argentina.Car.weight_cost,
          workTime: roadwayObjBRE.ruleCosts.Argentina.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Argentina.Car.average_consumption_cost, 
          rateExchange:roadwayObjBRE.ruleCosts.Argentina.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Argentina.Car.current_exchange},
          {country:'Argentina', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Argentina.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Argentina.Motorcycle.weight_cost,
          workTime: roadwayObjBRE.ruleCosts.Argentina.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Argentina.Motorcycle.average_consumption_cost, 
          rateExchange:roadwayObjBRE.ruleCosts.Argentina.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Argentina.Motorcycle.current_exchange},
          {country:'Argentina', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Argentina.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Argentina.Truck.weight_cost,
          workTime: roadwayObjBRE.ruleCosts.Argentina.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Argentina.Truck.average_consumption_cost, 
          rateExchange:roadwayObjBRE.ruleCosts.Argentina.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Argentina.Truck.current_exchange},
          {country:'Argentina', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Argentina.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Argentina.Walking.weight_cost,
          workTime: roadwayObjBRE.ruleCosts.Argentina.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Argentina.Walking.average_consumption_cost, 
          rateExchange:roadwayObjBRE.ruleCosts.Argentina.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Argentina.Walking.current_exchange}];

          // Bolivia
          this.instanceCosts_Bolivia = [
            {country:'Bolivia', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Bolivia.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Bolivia.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Bolivia.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Bolivia.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Bolivia.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Bolivia.Bicycle.current_exchange},
            {country:'Bolivia', transport:'Car', distance:roadwayObjBRE.ruleCosts.Bolivia.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Bolivia.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Bolivia.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Bolivia.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Bolivia.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Bolivia.Car.current_exchange},
            {country:'Bolivia', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Bolivia.Motorcycle.current_exchange},
            {country:'Bolivia', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Bolivia.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Bolivia.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Bolivia.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Bolivia.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Bolivia.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Bolivia.Truck.current_exchange},
            {country:'Bolivia', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Bolivia.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Bolivia.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Bolivia.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Bolivia.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Bolivia.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Bolivia.Walking.current_exchange}];

          // Brazil
          this.instanceCosts_Brazil = [
            {country:'Brazil', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Brazil.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Brazil.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Brazil.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Brazil.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Brazil.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Brazil.Bicycle.current_exchange},
            {country:'Brazil', transport:'Car', distance:roadwayObjBRE.ruleCosts.Brazil.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Brazil.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Brazil.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Brazil.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Brazil.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Brazil.Car.current_exchange},
            {country:'Brazil', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Brazil.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Brazil.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Brazil.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Brazil.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Brazil.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Brazil.Motorcycle.current_exchange},
            {country:'Brazil', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Brazil.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Brazil.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Brazil.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Brazil.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Brazil.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Brazil.Truck.current_exchange},
            {country:'Brazil', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Brazil.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Brazil.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Brazil.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Brazil.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Brazil.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Brazil.Walking.current_exchange}];

          // Chile
          this.instanceCosts_Chile = [
            {country:'Chile', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Chile.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Chile.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Chile.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Chile.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Chile.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Chile.Bicycle.current_exchange},
            {country:'Chile', transport:'Car', distance:roadwayObjBRE.ruleCosts.Chile.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Chile.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Chile.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Chile.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Chile.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Chile.Car.current_exchange},
            {country:'Chile', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Chile.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Chile.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Chile.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Chile.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Chile.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Chile.Motorcycle.current_exchange},
            {country:'Chile', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Chile.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Chile.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Chile.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Chile.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Chile.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Chile.Truck.current_exchange},
            {country:'Chile', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Chile.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Chile.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Chile.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Chile.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Chile.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Chile.Walking.current_exchange}];

          // Colombia
          this.instanceCosts_Colombia = [
            {country:'Colombia', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Colombia.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Colombia.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Colombia.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Colombia.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Colombia.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Colombia.Bicycle.current_exchange},
            {country:'Colombia', transport:'Car', distance:roadwayObjBRE.ruleCosts.Colombia.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Colombia.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Colombia.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Colombia.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Colombia.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Colombia.Car.current_exchange},
            {country:'Colombia', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Colombia.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Colombia.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Colombia.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Colombia.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Colombia.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Colombia.Motorcycle.current_exchange},
            {country:'Colombia', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Colombia.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Colombia.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Colombia.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Colombia.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Colombia.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Colombia.Truck.current_exchange},
            {country:'Colombia', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Colombia.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Colombia.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Colombia.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Colombia.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Colombia.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Colombia.Walking.current_exchange}];

           // Ecuador
          this.instanceCosts_Ecuador = [ 
            {country:'Ecuador', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Ecuador.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Ecuador.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Ecuador.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Ecuador.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Ecuador.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Ecuador.Bicycle.current_exchange},
            {country:'Ecuador', transport:'Car', distance:roadwayObjBRE.ruleCosts.Ecuador.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Ecuador.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Ecuador.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Ecuador.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Ecuador.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Ecuador.Car.current_exchange},
            {country:'Ecuador', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Ecuador.Motorcycle.current_exchange},
            {country:'Ecuador', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Ecuador.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Ecuador.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Ecuador.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Ecuador.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Ecuador.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Ecuador.Truck.current_exchange},
            {country:'Ecuador', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Ecuador.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Ecuador.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Ecuador.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Ecuador.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Ecuador.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Ecuador.Walking.current_exchange}];

            // Guyana
          this.instanceCosts_Guyana = [
            {country:'Guyana', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Guyana.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Guyana.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Guyana.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Guyana.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Guyana.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Guyana.Bicycle.current_exchange},
            {country:'Guyana', transport:'Car', distance:roadwayObjBRE.ruleCosts.Guyana.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Guyana.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Guyana.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Guyana.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Guyana.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Guyana.Car.current_exchange},
            {country:'Guyana', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Guyana.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Guyana.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Guyana.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Guyana.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Guyana.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Guyana.Motorcycle.current_exchange},
            {country:'Guyana', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Guyana.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Guyana.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Guyana.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Guyana.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Guyana.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Guyana.Truck.current_exchange},
            {country:'Guyana', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Guyana.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Guyana.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Guyana.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Guyana.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Guyana.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Guyana.Truck.current_exchange}];

            // Paraguay
          this.instanceCosts_Paraguay = [
            {country:'Paraguay', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Paraguay.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Paraguay.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Paraguay.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Paraguay.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Paraguay.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Paraguay.Bicycle.current_exchange},
            {country:'Paraguay', transport:'Car', distance:roadwayObjBRE.ruleCosts.Paraguay.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Paraguay.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Paraguay.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Paraguay.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Paraguay.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Paraguay.Car.current_exchange},
            {country:'Paraguay', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Paraguay.Motorcycle.current_exchange},
            {country:'Paraguay', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Paraguay.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Paraguay.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Paraguay.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Paraguay.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Paraguay.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Paraguay.Truck.current_exchange},
            {country:'Paraguay', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Paraguay.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Paraguay.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Paraguay.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Paraguay.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Paraguay.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Paraguay.Walking.current_exchange}];

            // Peru
          this.instanceCosts_Peru = [
            {country:'Peru', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Peru.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Peru.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Peru.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Peru.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Peru.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Peru.Bicycle.current_exchange},
            {country:'Peru', transport:'Car', distance:roadwayObjBRE.ruleCosts.Peru.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Peru.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Peru.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Peru.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Peru.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Peru.Car.current_exchange},
            {country:'Peru', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Peru.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Peru.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Peru.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Peru.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Peru.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Peru.Motorcycle.current_exchange},
            {country:'Peru', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Peru.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Peru.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Peru.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Peru.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Peru.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Peru.Truck.current_exchange},
            {country:'Peru', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Peru.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Peru.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Peru.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Peru.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Peru.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Peru.Walking.current_exchange}];

          // Suriname
          this.instanceCosts_Suriname = [
            {country:'Suriname', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Suriname.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Suriname.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Suriname.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Suriname.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Suriname.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Suriname.Bicycle.current_exchange},
            {country:'Suriname', transport:'Car', distance:roadwayObjBRE.ruleCosts.Suriname.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Suriname.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Suriname.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Suriname.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Suriname.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Suriname.Car.current_exchange},
            {country:'Suriname', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Suriname.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Suriname.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Suriname.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Suriname.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Suriname.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Suriname.Motorcycle.current_exchange},
            {country:'Suriname', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Suriname.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Suriname.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Suriname.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Suriname.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Suriname.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Suriname.Truck.current_exchange},
            {country:'Suriname', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Suriname.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Suriname.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Suriname.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Suriname.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Suriname.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Suriname.Walking.current_exchange}];

          // Uruguay
          this.instanceCosts_Uruguay = [
            {country:'Uruguay', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Uruguay.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Uruguay.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Uruguay.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Uruguay.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Uruguay.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Uruguay.Bicycle.current_exchange},
            {country:'Uruguay', transport:'Car', distance:roadwayObjBRE.ruleCosts.Uruguay.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Uruguay.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Uruguay.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Uruguay.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Uruguay.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Uruguay.Car.current_exchange},
            {country:'Uruguay', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.current_exchange},
            {country:'Uruguay', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Uruguay.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Uruguay.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Uruguay.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Uruguay.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Uruguay.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Uruguay.Motorcycle.current_exchange},
            {country:'Uruguay', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Uruguay.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Uruguay.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Uruguay.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Uruguay.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Uruguay.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Uruguay.Walking.current_exchange}];

          // Venezuela
          this.instanceCosts_Venezuela = [
            {country:'Venezuela', transport:'Bicycle', distance:roadwayObjBRE.ruleCosts.Venezuela.Bicycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Venezuela.Bicycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Venezuela.Bicycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Venezuela.Bicycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Venezuela.Bicycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Venezuela.Bicycle.current_exchange},
            {country:'Venezuela', transport:'Car', distance:roadwayObjBRE.ruleCosts.Venezuela.Car.distance_cost, weight: roadwayObjBRE.ruleCosts.Venezuela.Car.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Venezuela.Car.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Venezuela.Car.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Venezuela.Car.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Venezuela.Car.current_exchange},
            {country:'Venezuela', transport:'Motorcycle', distance:roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.distance_cost, weight: roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Venezuela.Motorcycle.current_exchange},
            {country:'Venezuela', transport:'Truck', distance:roadwayObjBRE.ruleCosts.Venezuela.Truck.distance_cost, weight: roadwayObjBRE.ruleCosts.Venezuela.Truck.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Venezuela.Truck.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Venezuela.Truck.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Venezuela.Truck.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Venezuela.Truck.current_exchange},
            {country:'Venezuela', transport:'Walking', distance:roadwayObjBRE.ruleCosts.Venezuela.Walking.distance_cost, weight: roadwayObjBRE.ruleCosts.Venezuela.Walking.weight_cost,
            workTime: roadwayObjBRE.ruleCosts.Venezuela.Walking.worktime_cost, averageConsumption: roadwayObjBRE.ruleCosts.Venezuela.Walking.average_consumption_cost, 
            rateExchange:roadwayObjBRE.ruleCosts.Venezuela.Walking.rate_exchange, currentExchange:roadwayObjBRE.ruleCosts.Venezuela.Walking.current_exchange}];
          
          this.instanceCountryCosts_data =[
            {country:'Argentina', instanceCosts_data:this.instanceCosts_Argentina},
            {country:'Bolivia', instanceCosts_data:this.instanceCosts_Bolivia},
            {country:'Colombia', instanceCosts_data:this.instanceCosts_Colombia},
            {country:'Brazil', instanceCosts_data:this.instanceCosts_Brazil},
            {country:'Venezuela', instanceCosts_data:this.instanceCosts_Venezuela},
            {country:'Ecuador', instanceCosts_data:this.instanceCosts_Ecuador},
            {country:'Uruguay', instanceCosts_data:this.instanceCosts_Uruguay},
            {country:'Guyana', instanceCosts_data:this.instanceCosts_Guyana},
            {country:'Suriname', instanceCosts_data:this.instanceCosts_Suriname},
            {country:'Chile', instanceCosts_data:this.instanceCosts_Chile},
            {country:'Paraguay', instanceCosts_data:this.instanceCosts_Paraguay},
            {country:'Peru', instanceCosts_data:this.instanceCosts_Peru}
          ];
          this.instanceRuleDS = this.instanceRule_data;
          this.findCostsTollsFuel();
          this.findCostsByCountry_refresh();
          
    });
    return roadwayObjBRE;
  }

  openDialogInstanceRule(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      height: '225px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogInstanceCosts(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxCostsComponent, {
      width: '450px',
      height: '360px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selected_country = obj.country;
      this.FindRoadwayBRE();
    });
  }

  openDialogTollsFuelCosts(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxTollsfuelComponent, {
      width: '450px',
      height: '280px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selected_country = obj.country;
      this.findCostsTollsFuel();
    });
  }

  findCostsByCountry(){
    console.log(' T ', this.instanceCountryCosts_data.length);
    for (var i = 0; i < this.instanceCountryCosts_data.length; i++) {
      if (this.instanceCountryCosts_data[i].country == this.selected_country) {
        this.instanceCostsCountryDS = this.instanceCountryCosts_data[i].instanceCosts_data;
        break;
      }
    }
    for (var i = 0; i < this.instanceTollsFuel_data.length; i++) {
      if (this.instanceTollsFuel_data[i].country == this.selected_country) {
        this.instanceTollsFuelDS = this.instanceTollsFuel_data[i].tollsFuelCosts;
        break;
      }
    }
  }

  findCostsTollsFuel(){
    console.log(' findCostsTollsFuel ');
    var tollsFuelObj = {} as TollsfuelBRE;

    this.roadwayService.getTollsFuelBRE()
      .subscribe((tollsFuelResponse: Response) =>{

        var tollsFuel = JSON.stringify(tollsFuelResponse.body);
        console.log(" : TOLLSFUEL :  ",tollsFuel);

        var obj = JSON.parse(tollsFuel, function (key, value){

          if (key == "tollsfuelPriceCountry") {
            tollsFuelObj.tollsfuelPriceCountry = value;
            return value;
          }
          else {
            console.log("NO");
            return value;
          }
        });

        this.tollsFuelObjBRE = tollsFuelObj;

        // ARGENTINA
        this.instanceTollFuel_Argentina = [
          {country:'Argentina',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Argentina.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Argentina.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Argentina.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Argentina.current_exchange}];

          // Bolivia
          this.instanceTollFuel_Bolivia = [
          {country:'Bolivia',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Bolivia.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Bolivia.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Bolivia.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Bolivia.current_exchange}];

          // Brazil
          this.instanceTollFuel_Brazil = [
          {country:'Brazil',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Brazil.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Brazil.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Brazil.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Brazil.current_exchange}];

           // Chile
          this.instanceTollFuel_Chile = [
          {country:'Chile',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Chile.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Chile.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Chile.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Chile.current_exchange}];

           // Colombia
          this.instanceTollFuel_Colombia = [
          {country:'Colombia',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Colombia.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Colombia.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Colombia.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Colombia.current_exchange}];

          // Ecuador
          this.instanceTollFuel_Ecuador = [
          {country:'Ecuador',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Ecuador.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Ecuador.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Ecuador.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Ecuador.current_exchange}];

           // Guyana
          this.instanceTollFuel_Guyana = [
          {country:'Guyana',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Guyana.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Guyana.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Guyana.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Guyana.current_exchange}];

          // Paraguay
          this.instanceTollFuel_Paraguay = [
          {country:'Paraguay',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Paraguay.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Paraguay.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Paraguay.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Paraguay.current_exchange}];
 
          // Peru
          this.instanceTollFuel_Peru = [
          {country:'Peru',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Peru.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Peru.fuelGasoline_price,
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Peru.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Peru.current_exchange}];
 
          // Suriname
          this.instanceTollFuel_Suriname = [
          {country:'Suriname',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Suriname.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Suriname.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Suriname.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Suriname.current_exchange}];

          // Uruguay
          this.instanceTollFuel_Uruguay = [
          {country:'Uruguay',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Uruguay.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Uruguay.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Uruguay.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Uruguay.current_exchange}];

          // Venezuela
          this.instanceTollFuel_Venezuela = [
          {country:'Venezuela',tollsPrice:tollsFuelObj.tollsfuelPriceCountry.Venezuela.tolls_price, fuelGasolinePrice: tollsFuelObj.tollsfuelPriceCountry.Venezuela.fuelGasoline_price, 
          fuelDieselPrice: tollsFuelObj.tollsfuelPriceCountry.Venezuela.fuelDiesel_price, currentExchange: tollsFuelObj.tollsfuelPriceCountry.Venezuela.current_exchange}];

          this.instanceTollsFuel_data =[
            {country:'Argentina', tollsFuelCosts:this.instanceTollFuel_Argentina},
            {country:'Bolivia', tollsFuelCosts:this.instanceTollFuel_Bolivia},
            {country:'Colombia', tollsFuelCosts:this.instanceTollFuel_Colombia},
            {country:'Brazil', tollsFuelCosts:this.instanceTollFuel_Brazil},
            {country:'Venezuela', tollsFuelCosts:this.instanceTollFuel_Venezuela},
            {country:'Ecuador', tollsFuelCosts:this.instanceTollFuel_Ecuador},
            {country:'Uruguay', tollsFuelCosts:this.instanceTollFuel_Uruguay},
            {country:'Guyana', tollsFuelCosts:this.instanceTollFuel_Guyana},
            {country:'Suriname', tollsFuelCosts:this.instanceTollFuel_Suriname},
            {country:'Chile', tollsFuelCosts:this.instanceTollFuel_Chile},
            {country:'Paraguay', tollsFuelCosts:this.instanceTollFuel_Paraguay},
            {country:'Peru', tollsFuelCosts:this.instanceTollFuel_Peru}
          ];
          this.instanceRuleDS = this.instanceRule_data;
          this.updateTableTollsFuel();
    });
    
  }

  findCostsByCountry_refresh(){
    if (this.selected_country != null){
      console.log(' RICARDO MARZOCHI ', this.instanceCountryCosts_data.length);
      for (var i = 0; i < this.instanceCountryCosts_data.length; i++) {
        if (this.instanceCountryCosts_data[i].country == this.selected_country) {
          this.instanceCostsCountryDS = this.instanceCountryCosts_data[i].instanceCosts_data;
          break;
        }
      }
      /*for (var i = 0; i < this.instanceTollsFuel_data.length; i++) {
        if (this.instanceTollsFuel_data[i].country == this.selected_country) {
          this.instanceTollsFuelDS = this.instanceTollsFuel_data[i].tollsFuelCosts;
          break;
        }
      }*/
    }
  }

  updateTableTollsFuel(){
    console.log(' updateTableTollsFuel ', this.selected_country);
    if (this.selected_country != null){
      console.log(' RICARDO MARZOCHI ', this.instanceCountryCosts_data.length);
      for (var i = 0; i < this.instanceTollsFuel_data.length; i++) {
        if (this.instanceTollsFuel_data[i].country == this.selected_country) {
          this.instanceTollsFuelDS = this.instanceTollsFuel_data[i].tollsFuelCosts;
          break;
        }
      }
    }
  }


}
