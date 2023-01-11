import { Component, OnInit } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private sessionService: SessionService) { }

  user:string = ''
  password:string = ''
  ngOnInit(): void {
  }
  Login(){
    this.sessionService.Login({user:this.user, password: this.password}).subscribe((resp:any)=>{
      let {status} = resp;
      if (status) {
        console.log('pasa a la ventana de login...');
      }
    }) 
  }

}
