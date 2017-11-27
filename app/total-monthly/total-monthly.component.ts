import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';
import { Chart } from 'chart.js';

// Success and error response interfaces
interface TotalMonthly {
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
}

@Component({
  selector: 'app-total-monthly',
  templateUrl: './total-monthly.component.html',
  styleUrls: ['./total-monthly.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TotalMonthlyComponent implements OnInit {
    // reference to graph canvas
    @ViewChild('graph') graph;

    // chart data
    data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Expenses',
            data: []
        }]
    };

    // inject http
    constructor(private http: HttpClient) { }

    ngOnInit() {
        // get monthly totals from the server
        this.http.get<TotalMonthly>(URL + '/api/expenses/total_monthly/').subscribe(
            res => {
                // draw chart on canvas
                let ctx = this.graph.nativeElement.getContext('2d');
                let chart = new Chart(ctx, {
                    'type': 'line',
                    'data': this.data,
                });

                // update chart data from server
                this.data.datasets[0].data = [res.january, res.february, res.march,
                                              res.april, res.may, res.june, res.july,
                                              res.august, res.september, res.october,
                                              res.november, res.december];
                chart.update();
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
