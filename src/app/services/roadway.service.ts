import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { SimulationModel } from '../models/simulation-model';
import { Roadway } from '../models/roadway';
import { RoadwayBussineRule } from '../models/bre/roadwaybussinerule';

@Injectable({
  providedIn: 'root'
})
export class RoadwayService {

  url_simulation = 'http://192.241.133.13:9098/roadway/simulation';
  url_bre = 'http://192.241.133.13:9100/businessrule/sa/roadway';
  constructor(private httpClient: HttpClient) { }

  roadway1 = {} as Roadway;

   // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
 
  getRoadwayBRE(roadwaybre: string): Observable<Response>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers = headers.append('isoLanguageCode', 'pt');
    headers = headers.append('isoCountryCode', 'BR');
    headers = headers.append('isoCurrencyCode', 'BRL');
    headers = headers.append('originApp', 'APP-WEB');
    let options = {headers: headers}
    let params = new HttpParams();
    params = params.append('name_rule', 'Roadway-SouthAmerica-BRE');
    return this.httpClient.get<Response>(this.url_bre, {headers, params})
       .pipe(
           retry(2),
          catchError(this.handleError)
       );
  }

  postRoadwayBRE(roadwaybre: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers = headers.append('isoLanguageCode', 'pt');
    headers = headers.append('isoCountryCode', 'BR');
    headers = headers.append('isoCurrencyCode', 'BRL');
    headers = headers.append('originApp', 'APP-WEB');
    let options = {headers: headers}
    return this.httpClient.post(this.url_bre, roadwaybre,{'headers':headers})
  }

  getSimulation(simulation: SimulationModel): Observable<Response>{
    let params = new HttpParams();
    params = params.append('address_origin', simulation.address_origin);
    params = params.append('address_destination', simulation.address_destination);
    params = params.append('type_product', simulation.type_product);
    params = params.append('weight_product', simulation.weight_product);
    params = params.append('type_delivery', simulation.type_delivery);
    params = params.append('unity_measurement_weight', simulation.unity_measurement_weight);
    params = params.append('unity_measurement_distance_txt', simulation.unity_measurement_distance_txt);

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('isoLanguageCode', 'pt');
    headers = headers.append('isoCountryCode', 'BR');
    headers = headers.append('isoCurrencyCode', 'BRL');
    headers = headers.append('originApp', 'APP-MOBILE');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return this.httpClient.get<Response>(this.url_simulation, {headers, params})
       .pipe(
           retry(2),
          catchError(this.handleError)
       );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
