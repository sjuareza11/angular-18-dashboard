import { Component, inject, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UiInputComponent } from '@common/ui/ui-input/ui-input.component';
import { DashboardFacade } from '@dashboard/facade/dashboard.facade';

@Component({
  selector: 'app-top-sales-table',
  standalone: true,
  imports: [UiInputComponent, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink],
  templateUrl: './top-sales-table.component.html',
  styleUrl: './top-sales-table.component.scss',
})
export class TopSalesTableComponent {
  private readonly dashboardFacade: DashboardFacade = inject(DashboardFacade);

  readonly tablePaginator = viewChild<MatPaginator>('topSalesPaginator');
  readonly DISPLAYED_COLUMNS = ['productName', 'platform', 'amount'];

  readonly sales = this.dashboardFacade.sales;
  readonly totalSales = this.dashboardFacade.totalSales;
  readonly searchValue = signal<string>('');

  onPageChange(event: any) {
    this.dashboardFacade.getSales(this.searchValue(), this.dashboardFacade.selectedPlatform(), {
      page: event.pageIndex + 1,
      pageSize: event.pageSize,
    });
  }

  onSearchCriteriaChange() {
    this.dashboardFacade.getSales(this.searchValue(), this.dashboardFacade.selectedPlatform());
  }
}
