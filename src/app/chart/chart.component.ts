import {Component, OnInit} from "@angular/core";
import {ChartService} from "./chart.service";

@Component({
  selector: 'line-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

  constructor(private chartService: ChartService) {

  }

  ngOnInit() {
    this.chartService.getData().then(data => {
      // this.lineChartLabels = data.xAxis;
      // console.log("data:"+data);
      for (var i = 0; i < data.xAxis.length; i++) {
        // console.log(data.xAxis[i]);
        this.lineChartLabels[i] = data.xAxis[i];
      }
      // console.log("vvvvvvvvv:"+data.datas[0].data);
      this.lineChartData = data.datas;

    });
  }

  public lineChartLabels: Array<any> = ['', '', '', '', '', '', ''];
  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: ''},
    {data: [0, 0, 0, 0, 0, 0, 0], label: ''},
    {data: [0, 0, 0, 0, 0, 0, 0], label: ''}
  ];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(29,78,130,0.5)',
      borderColor: 'rgba(29,78,130,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(255,181,58,0.5)',
      borderColor: 'rgba(255,181,58,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(235,69,73,0.5)',
      borderColor: 'rgba(235,69,73,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
