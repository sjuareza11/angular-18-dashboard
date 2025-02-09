export interface SalesMetrics {
  sales: number;
  revenue: number;
}

export interface GroupedSalesMetrics {
  [groupKey: string]: SalesMetrics;
}

export interface PlatformSalesMetrics {
  [platform: string]: GroupedSalesMetrics;
}
