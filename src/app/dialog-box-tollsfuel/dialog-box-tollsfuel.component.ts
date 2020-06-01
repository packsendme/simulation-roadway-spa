import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { RoadwayService } from '../services/roadway.service';
import { TollsfuelBRE } from '../models/bre/tollsFuel/tollsfuel-bre';

export interface tollsFuelCosts {
  country: string;
  tollsPrice: number;
  fuelGasolinePrice: number;
  fuelDieselPrice: number;
  currentExchange: string;
}

@Component({
  selector: 'app-dialog-box-tollsfuel',
  templateUrl: './dialog-box-tollsfuel.component.html',
  styleUrls: ['./dialog-box-tollsfuel.component.css']
})
export class DialogBoxTollsfuelComponent implements OnInit {

  action:string;
  local_data:any;
  tollsFuelObjBRE: TollsfuelBRE = null;

 constructor(
    private roadwayService: RoadwayService,
    public dialogRef: MatDialogRef<DialogBoxTollsfuelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: tollsFuelCosts) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.findCostsTollsFuel();
  }

   doAction(){
    if(this.local_data.country == 'Colombia'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Colombia.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Colombia.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Colombia.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Venezuela
    else if(this.local_data.country == 'Venezuela'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Venezuela.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Venezuela.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Venezuela.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Ecuador
    else if(this.local_data.country == 'Ecuador'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Ecuador.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Ecuador.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Ecuador.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Argentina
    else if(this.local_data.country == 'Argentina'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Argentina.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Argentina.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Argentina.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Uruguay
    else if(this.local_data.country == 'Uruguay'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Uruguay.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Uruguay.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Uruguay.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Brazil
    else if(this.local_data.country == 'Brazil'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Brazil.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Brazil.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Brazil.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Guyana
    else if(this.local_data.country == 'Guyana'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Guyana.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Guyana.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Guyana.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Suriname
    else if(this.local_data.country == 'Suriname'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Suriname.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Suriname.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Suriname.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Chile
    else if(this.local_data.country == 'Chile'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Chile.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Chile.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Chile.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Bolivia
    else if(this.local_data.country == 'Bolivia'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Bolivia.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Bolivia.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Bolivia.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    // Paraguay
    else if(this.local_data.country == 'Paraguay'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Paraguay.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Paraguay.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Paraguay.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
     // Peru
    else if(this.local_data.country == 'Peru'){
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Peru.tolls_price = this.local_data.tollsPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Peru.fuelDiesel_price = this.local_data.fuelDieselPrice;
      this.tollsFuelObjBRE.tollsfuelPriceCountry.Peru.fuelGasoline_price = this.local_data.fuelGasolinePrice;
    }
    var resSTR = JSON.stringify(this.tollsFuelObjBRE);
    console.log("updateTollsFuelBRE -- II ", resSTR)
    this.updateTollsFuelBRE(resSTR);
  }

  updateTollsFuelBRE(tollsfuelbre: string){
    console.log("updateTollsFuelBRE")
    this.roadwayService.postTollsFuelBRE(tollsfuelbre).subscribe((response: Response) =>{
      this.closeDialog();
    });
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  findCostsTollsFuel(){
    console.log(' findCostsTollsFuel ');
    var tollsFuelObj = {} as TollsfuelBRE;

    this.roadwayService.getTollsFuelBRE().subscribe((tollsFuelResponse: Response) =>{
      var tollsFuel = JSON.stringify(tollsFuelResponse.body);
      console.log(" : TOLLSFUEL :  ",tollsFuel);

      var obj = JSON.parse(tollsFuel, function (key, value){
        if (key == "name_rule") {
          tollsFuelObj.name_rule = value;
          return value;
        }
        else if (key == "tollsfuelPriceCountry") {
          tollsFuelObj.tollsfuelPriceCountry = value;
          return value;
        }
        else {
          console.log("NO");
          return value;
        }
      });
      this.tollsFuelObjBRE = tollsFuelObj;
    });
  }

}
