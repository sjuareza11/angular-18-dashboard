import { Component, input, signal, Signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  title = input<string>('Bar Chart');
  barChartData = input<ChartData<'bar'>>();

  barChartOptions: Signal<ChartOptions<'bar'>> = signal({
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  });
}
