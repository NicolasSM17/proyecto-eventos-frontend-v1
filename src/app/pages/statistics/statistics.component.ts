import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  earnedAmount: string = 'S/0.00';
  nextIncome: string = 'S/2,332.85';
  monthlyData: { month: string, amount: number }[] = [
    { month: 'ene', amount: 0 },
    { month: 'feb', amount: 0 },
    { month: 'mar', amount: 500 },
    { month: 'abr', amount: 300 },
    { month: 'may', amount: 2800 },
    { month: 'jun', amount: 1000 },
    { month: 'jul', amount: 0 },
    { month: 'ago', amount: 500 },
    { month: 'sept', amount: 0 },
    { month: 'oct', amount: 0 },
    { month: 'nov', amount: 0 },
    { month: 'dic', amount: 0 }
  ];
  
  yearSummary = {
    period: '1 ene. - 2 jul. 2024',
    grossIncome: 'S/4,350.00',
    adjustments: 'S/0.00',
    serviceCharge: '-S/130.50',
    taxesWithheld: 'S/0.00',
    total: 'S/4,219.50'
  };

  constructor() { }

  ngOnInit(): void { }
}
