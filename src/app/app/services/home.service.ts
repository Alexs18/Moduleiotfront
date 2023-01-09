import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  DataIot():Observable<any>{
    let {URI} = environment
    return this.http.get(`${URI}/get/mediciones/grupo3`);
  }

  
}
