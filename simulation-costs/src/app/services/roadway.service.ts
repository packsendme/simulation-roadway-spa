import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { SimulationModel } from '../models/simulation-model';
import { Roadway } from '../models/roadway';

@Injectable({
  providedIn: 'root'
})
export class RoadwayService {

  url = 'http://192.241.133.13:9098/roadway/simulation';
  constructor(private httpClient: HttpClient) { }

  roadway1 = {} as Roadway;

   // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
/*
   public getRoadway(simulation: SimulationModel): Observable<Roadway> {

    let params = new HttpParams();
    params = params.append('address_origin',simulation.address_origin);
    params = params.append('address_destination',simulation.address_destination);
    params = params.append('type_product',simulation.type_product);
    params = params.append('weight_product',simulation.weight_product);
    params = params.append('type_delivery',simulation.type_delivery);
    params = params.append('unity_measurement_weight',simulation.unity_measurement_weight);
    params = params.append('unity_measurement_distance_txt','KM');

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('isoLanguageCode','pt');
    headers = headers.append('isoCountryCode','BR');
    headers = headers.append('isoCurrencyCode','BRL');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return this.httpClient.get<Roadway>(this.url,{headers, params}).pipe(
      map(data => new Roadway().deserialize(data)),
      catchError(() => throwError('Roadway not found'))
    );
  }*/


  getSimulation(simulation: SimulationModel): Observable<Response>{
    let params = new HttpParams();
    params = params.append('address_origin',simulation.address_origin);
    params = params.append('address_destination',simulation.address_destination);
    params = params.append('type_product',simulation.type_product);
    params = params.append('weight_product',simulation.weight_product);
    params = params.append('type_delivery',simulation.type_delivery);
    params = params.append('unity_measurement_weight',simulation.unity_measurement_weight);
    params = params.append('unity_measurement_distance_txt','KM');

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('isoLanguageCode','pt');
    headers = headers.append('isoCountryCode','BR');
    headers = headers.append('isoCurrencyCode','BRL');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return this.httpClient.get<Response>(this.url, {headers, params})
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
