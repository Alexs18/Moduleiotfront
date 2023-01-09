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
          this.tiempo.push(medidas.tiempo);
          this.ppm.push(medidas.ppm); 
          
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

}
