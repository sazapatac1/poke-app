import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  // variable to detail view
  @Input('stats') stats: Array<any>;
  // variables to compare view
  @Input('firstPokemonStats') firstPokemonStats: Array<any>;
  @Input('secondPokemonStats') secondPokemonStats: Array<any>;

  constructor() {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartColors: Color[] = [
    { backgroundColor: '#157a69' },
    { backgroundColor: '#26b19d' },
  ];

  public barChartLabels: Array<string>;
  public barChartData: Array<object>;

  fillChartData(stats: Array<any>, anotherStats?: Array<any>) {
    let data = [];
    let anotherData = [];
    let labels = [];
    stats.forEach((stat) => {
      labels.push(stat.stat.name);
      data.push(stat.base_stat);
    });
    this.barChartLabels = labels;
    this.barChartData = [{ data: data }];
    if (anotherStats) {
      anotherStats.forEach((stat) => {
        anotherData.push(stat.base_stat);
      });
      this.barChartData.push({ data: anotherData });
    }
  }

  ngOnInit(): void {
    if (this.stats) {
      this.fillChartData(this.stats);
    } else if (this.firstPokemonStats && this.secondPokemonStats) {
      this.fillChartData(this.firstPokemonStats, this.secondPokemonStats);
    }
  }
}
