import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoadwayService } from '../services/roadway.service';
import { SimulationModel } from '../models/simulation-model';
import { Roadway } from '../models/roadway';
import { map } from 'rxjs/operators';

interface Produto {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  transportador: string;
  delivery: string;
  reshipping: string;
  packsend: string;
  total: string;
 }

@Component({
  selector: 'app-roadway-calculator',
  templateUrl: './roadway-calculator.component.html',
  styleUrls: ['./roadway-calculator.component.css']
})
export class RoadwayCalculatorComponent {

  title = 'appBootstrap';
  public isCollapsed = false;
  
  BICYCLE_DATA: PeriodicElement[];
  CAR_DATA: PeriodicElement[];
  MOTOCYCLE_DATA: PeriodicElement[];
  TRUCK_DATA: PeriodicElement[];
  WALKING_DATA: PeriodicElement[];

  unity_measurement: string;
  selected_typeproduct : string;
  public resSTR: string

  roadway = {} as Roadway;
  simulation = {} as SimulationModel;
  
  //DataSource
  bicycleDS  = [];
  carDS  = [];
  motocycleDS  = [];
  truckDS  = [];
  walkingDS  = [];
  
  displayedColumns: string[] = ['transportador', 'delivery', 'reshipping', 'packsend', 'total'];
  showSpinner = false;

    produtos: Produto[] = [
        {value: 'Acampamento', viewValue: 'Acampamento'},
        {value: 'Acessorios Pessoais', viewValue: 'Acessorios Pessoais'},
        {value: 'Alimento / Bebida / Tabaco', viewValue: 'Alimento / Bebida / Tabaco'},
        {value: 'Animais Vivos', viewValue: 'Animais Vivos'},
        {value: 'Aparelhos Eletronicos', viewValue: 'Aparelhos Eletronicos'},
        {value: 'Artes / Atesanato / Bordado', viewValue: 'Artes / Atesanato / Bordado'},
        {value: 'Artigo de Papelaria / Escritorio', viewValue: 'Artigo de Papelaria / Escritorio'},
        {value: 'Audio Visual/Fotografia', viewValue: 'Audio Visual/Fotografia'},
        {value: 'Brinquedos/Jogos', viewValue: 'Brinquedos/Jogos'},
        {value: 'Calcados', viewValue: 'Calcados'},
        {value: 'Combustiveis / Gases / Lubrificantes', viewValue: 'Combustiveis/Gases/Lubrificantes'},
        {value: 'Cuidado Animais Estimacao', viewValue: 'Cuidado Animais Estimacao'},
        {value: 'Equipamentos Encanamento/Aquecimento/Ventilacao', viewValue: 'Equipamento Encanamento/Aquecimento/Ventilacao'},
        {value: 'Equipamentos Esportivo', viewValue: 'Equipamento Esportivo'},
        {value: 'Equipamentos para Oficina/Armazenagem/Ferramentas', viewValue: 'Equipamento para Oficina/Armazenagem/Ferramentas'},
        {value: 'Equipamentos Eletrico', viewValue: 'Equipamentos Eletrico'},
        {value: 'Higiene/Cuidados Pessoais/Beleza', viewValue: 'Higiene/Cuidados Pessoais/Beleza'},
        {value: 'Materiais Jardinagem', viewValue: 'Materiais Jardinagem'},
        {value: 'Moveis e Artigos Mobiliarios', viewValue: 'Moveis e Artigos Mobiliarios'},
        {value: 'Plantas de Horticultura', viewValue: 'Plantas de Horticultura'},
        {value: 'Produtos de Higiene/Limpeza', viewValue: 'Produtos de Higiene/Limpeza'},
        {value: 'Produtos de Construcao', viewValue: 'Produtos de Construcao'},
        {value: 'Equipamento de Seguranca/Protecao', viewValue: 'Equipamento de Seguranca/Protecao'},
        {value: 'Equipamento de Saude Publica', viewValue: 'Equipamento de Saude Publica'},
        {value: 'Utensilios de Cozinha', viewValue: 'Utensilios de Cozinha'},
        {value: 'Utensilios Domestico', viewValue: 'Utensilios Domestico'}
    ];

  constructor(private roadwayService: RoadwayService) { 
  }

  findSimulationRoadway(form: NgForm){
    this.cleanData();
    this.loadData();
    console.log(this.unity_measurement);
    this.simulation.unity_measurement_weight = this.unity_measurement;
    this.simulation.type_product = this.selected_typeproduct;
 
    this.roadwayService.getSimulation(this.simulation)
    .subscribe((roadwayResponse: Response) =>{
      
      var resSTR1 = JSON.stringify(roadwayResponse.body);
      var roadway = {} as Roadway;

      console.log(" TESTE.....", resSTR1);

      var obj = JSON.parse(resSTR1, function (key, value) {
        if (key == "Car") {
          roadway.Car = value;
          return value;
        } 
        else if (key == "Bicycle") {
          roadway.Bicycle = value;
          return value;
        }
        else if (key == "Motorcycle") {
          roadway.Motorcycle = value;
          return value;
        }
        else if (key == "Truck") {
          roadway.Truck = value;
          return value;
        }
        else if (key == "Walking") {
        roadway.Walking = value;
        return value;
        }
        else {
          console.log("NO");
          return value;
        }
      });
      
      this.BICYCLE_DATA = [
        {transportador: roadway.Bicycle.vlr_employer_total,delivery: roadway.Bicycle.vlr_delivery_total,
      reshipping: roadway.Bicycle.vlr_reshipping, packsend:roadway.Bicycle.vlr_packsend_total, total:roadway.Bicycle.vlr_total}
      ];

      this.CAR_DATA = [
        {transportador: roadway.Car.vlr_employer_total,delivery: roadway.Car.vlr_delivery_total,
      reshipping: roadway.Car.vlr_reshipping, packsend:roadway.Car.vlr_packsend_total, total:roadway.Car.vlr_total}
      ];

      this.MOTOCYCLE_DATA = [
        {transportador: roadway.Motorcycle.vlr_employer_total,delivery: roadway.Motorcycle.vlr_delivery_total,
      reshipping: roadway.Motorcycle.vlr_reshipping, packsend:roadway.Motorcycle.vlr_packsend_total, total:roadway.Motorcycle.vlr_total}
      ];

      this.TRUCK_DATA = [
        {transportador: roadway.Truck.vlr_employer_total,delivery: roadway.Truck.vlr_delivery_total,
      reshipping: roadway.Truck.vlr_reshipping, packsend:roadway.Truck.vlr_packsend_total, total:roadway.Truck.vlr_total}
      ];

      this.WALKING_DATA = [
        {transportador: roadway.Walking.vlr_employer_total,delivery: roadway.Walking.vlr_delivery_total,
      reshipping: roadway.Walking.vlr_reshipping, packsend:roadway.Walking.vlr_packsend_total, total:roadway.Walking.vlr_total}
      ];

      this.getResultSimulation();
    });
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
  }

  cleanData(){
      this.BICYCLE_DATA = null;
      this.CAR_DATA = null;
      this.MOTOCYCLE_DATA = null;
      this.TRUCK_DATA = null;
      this.WALKING_DATA = null;
  }

  public getResultSimulation(){
    this.bicycleDS = this.BICYCLE_DATA;
    this.carDS = this.CAR_DATA;
    this.motocycleDS = this.MOTOCYCLE_DATA;
    this.truckDS = this.TRUCK_DATA;
    this.walkingDS = this.WALKING_DATA;
  }
 

}
