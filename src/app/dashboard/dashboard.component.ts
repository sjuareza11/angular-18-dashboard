import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DEFAULT_PLATFORM, DEFAULT_PLATFORM_LABEL } from '@common/models';
import { GamesApiService } from '@common/services';
import { UiSelectComponent } from '@common/ui';
import { ChartData } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TopRatingTableComponent } from './components/top-rating-table/top-rating-table.component';
import { TopSalesTableComponent } from './components/top-sales-table/top-sales-table.component';
import { DashboardFacade } from './facade/dashboard.facade';
import { SalesApiService } from './services/sales-api.service';
import { BarChartDataStrategy } from './strategies/bar-chart-data.strategy';
import { PieChartDataStrategy } from './strategies/pie-chart-data.strategy';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UiSelectComponent,
    BarChartComponent,
    PieChartComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TopSalesTableComponent,
    TopRatingTableComponent,
  ],
  providers: [DashboardFacade, GamesApiService, SalesApiService, BarChartDataStrategy, PieChartDataStrategy],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardFacade: DashboardFacade = inject(DashboardFacade);
  private readonly barChartDataStrategy: BarChartDataStrategy = inject(BarChartDataStrategy);
  private readonly pieChartDataStrategy: PieChartDataStrategy = inject(PieChartDataStrategy);
  private readonly toastr: ToastrService = inject(ToastrService);

  topSalesComponentRef = viewChild<TopSalesTableComponent>('topSales');
  topRatingComponentRef = viewChild<TopRatingTableComponent>('topRating');

  readonly barChartData: Signal<ChartData<'bar'>> = computed(() =>
    this.barChartDataStrategy.generateChartData(this.dashboardFacade.currentStats()),
  );

  readonly pieChartData: Signal<ChartData<'pie'>> = computed(() =>
    this.pieChartDataStrategy.generateChartData(this.dashboardFacade.currentStats()),
  );

  readonly platforms = computed(() =>
    this.dashboardFacade
      .platforms()
      .map(platform => (platform.name.replaceAll(' ', '') === DEFAULT_PLATFORM ? DEFAULT_PLATFORM_LABEL : platform.name)),
  );

  readonly errors = this.dashboardFacade.errors;
  readonly DEFAULT_PLATFORM_LABEL = DEFAULT_PLATFORM_LABEL;

  constructor() {
    effect(() => {
      const error = [...this.errors()].pop();
      if (error) {
        this.toastr.error(error);
        this.dashboardFacade.removeError(error);
      }
    });
  }

  ngOnInit() {
    this.dashboardFacade.getPlatforms();
    this.dashboardFacade.getSalesStats();
    this.dashboardFacade.getSales();
    this.dashboardFacade.getGames();
  }

  onChangePlatform(platform: string) {
    const paginator = this.topSalesComponentRef()?.tablePaginator();
    const topRatingPaginator = this.topRatingComponentRef()?.tablePaginator();
    this.resetPaginator(paginator);
    this.resetPaginator(topRatingPaginator);
    this.dashboardFacade.getSalesStats(platform);
    this.dashboardFacade.getSales('', platform);
    this.dashboardFacade.getGames('', platform);
  }

  private resetPaginator(paginatorRef: MatPaginator | undefined) {
    if (!paginatorRef) {
      return;
    }

    paginatorRef.pageSize = 25;
    paginatorRef.pageIndex = 0;
  }
}
