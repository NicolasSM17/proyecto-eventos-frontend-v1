import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  earnedAmount: string = 'S/400.00';
  monthlyData: { month: string, amount: number, normalizedAmount?: string }[] = [
    { month: 'ene', amount: 11000 },
    { month: 'feb', amount: 666 },
    { month: 'mar', amount: 500 },
    { month: 'abr', amount: 300 },
    { month: 'may', amount: 2800 },
    { month: 'jun', amount: 1000 },
    { month: 'jul', amount: 4000 },
    { month: 'ago', amount: 500 },
    { month: 'sept', amount: 2508 },
    { month: 'oct', amount: 22508 },
    { month: 'nov', amount: 2508 },
    { month: 'dic', amount: 2508 }
  ];
  
  yearSummary = {
    period: '1 ene. - 2 jul. 2024',
    grossIncome: 'S/4,350.00',
    serviceCharge: '-S/130.50',
    total: 'S/4,219.50'
  };

  constructor() { }

  ngOnInit(): void {
    const maxAmount = Math.max(...this.monthlyData.map(data => data.amount));
    this.monthlyData = this.monthlyData.map(data => ({
      ...data,
      normalizedAmount: `${(data.amount / maxAmount) * 100}px`// Valor normalizado
    }));
  }
}
