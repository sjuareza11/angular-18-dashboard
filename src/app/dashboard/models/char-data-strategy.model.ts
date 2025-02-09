import { ChartData, ChartType } from 'chart.js';

export interface ChartDataStrategy<T extends ChartType> {
  generateChartData(stats: Record<string, { revenue?: number; sales?: number }>): ChartData<T>;
}
