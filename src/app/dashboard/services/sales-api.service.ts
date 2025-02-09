import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformSalesMetrics, Sale } from '../models';

@Injectable()
export class SalesApiService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getTopSales(
    searchValue: string,
    platform: string,
    pagination: {
      page: number;
      pageSize: number;
    },
  ): Observable<{
    sales: Sale[];
    totalCount: number;
  }> {
    return this.http.get<{
      sales: Sale[];
      totalCount: number;
    }>(`${this.baseUrl}/top-sales/${platform}`, {
      params: {
        page: pagination.page.toString(),
        limit: pagination.pageSize.toString(),
        search: searchValue || '',
      },
    });
  }

  getStats(platform?: string): Observable<PlatformSalesMetrics> {
    return this.http.get<PlatformSalesMetrics>(`${this.baseUrl}/stats/` + `${platform ? platform : ''}`);
  }
}
