import { Component, OnInit, ElementRef , ViewChild, AfterViewInit} from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('myChat', {static:false}) myChat!:ElementRef;
  DatosMapeo:any = []
  tiempo:any = []
  ppm:any = []
  constructor(private service: HomeService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }
  async ngAfterViewInit(){
    
    const ctx:any = document.getElementById('myChart');
    console.log(ctx);
    this.service.DataIot().subscribe(async(resp:any)=>{
        let {data} = resp;
        for await (const medidas of data) {
          this.ppm.push(medidas.ppm);      
          let medida = this.ObtenerHora(medidas)
          this.tiempo.push(medida);
        }
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.tiempo,
            datasets: [{
              label: 'PPM',
              data: this.ppm,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    })
  
    
  }
  /**Cambia e formato timestamp a la hora para pasarla en el formato */
  ObtenerHora(medidas:any){
    let tiempo = new Date(medidas.tiempo);
    console.log('la fecha');
    console.log(tiempo.getDate());
    
    let dia = tiempo.getDay();
    console.log('el dia');
    console.log(dia);
    
    let hora = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    let segundos = tiempo.getSeconds();
    let medida = `${hora}:${minutos}:${segundos}`
    return medida
  }
}
