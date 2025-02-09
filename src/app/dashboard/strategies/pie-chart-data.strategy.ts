import { Injectable } from '@angular/core';
import { ChartHelpers } from '@dashboard/helpers/chart.helpers';
import { ChartDataStrategy } from '@dashboard/models/char-data-strategy.model';
import { ChartData } from 'chart.js';

@Injectable()
export class PieChartDataStrategy implements ChartDataStrategy<'pie'> {
  generateChartData(stats: Record<string, { sales?: number }>): ChartData<'pie'> {
    const labels = Object.keys(stats);
    const values = labels.map(label => stats[label]?.sales ?? 0);
    const colors = ChartHelpers.colors.slice(0, labels.length);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }
}
