import { Injectable } from '@angular/core';
import { ChartHelpers } from '@dashboard/helpers/chart.helpers';
import { ChartDataStrategy } from '@dashboard/models/char-data-strategy.model';
import { ChartData } from 'chart.js';

@Injectable()
export class BarChartDataStrategy implements ChartDataStrategy<'bar'> {
  generateChartData(stats: Record<string, { revenue?: number }>): ChartData<'bar'> {
    const labels = Object.keys(stats);
    const values = labels.map(label => stats[label]?.revenue ?? 0);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ChartHelpers.colors.slice(0, labels.length),
          label: 'Ventas',
        },
      ],
    };
  }
}
