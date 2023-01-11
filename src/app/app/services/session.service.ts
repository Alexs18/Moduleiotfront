import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  
  Login(usuario:any):Observable<any>{
    let {URI} = environment
    return this.http.post(`${URI}/login`, usuario);
  }

}
