import { Component, input, Signal, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  title = input<string>('Bar Chart');
  pieChartData = input<ChartData<'pie'>>();
  pieChartOptions: Signal<ChartOptions<'pie'>> = signal({
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  });
}
