import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UiInputComponent } from '@common/ui/ui-input/ui-input.component';
import { DashboardFacade } from '@dashboard/facade/dashboard.facade';

@Component({
  selector: 'app-top-rating-table',
  standalone: true,
  imports: [UiInputComponent, MatTableModule, MatSortModule, MatPaginatorModule, CurrencyPipe, RouterLink],
  templateUrl: './top-rating-table.component.html',
  styleUrl: './top-rating-table.component.scss',
})
export class TopRatingTableComponent {
  private readonly dashboardFacade: DashboardFacade = inject(DashboardFacade);

  readonly tablePaginator = viewChild<MatPaginator>('topSalesPaginator');
  readonly DISPLAYED_COLUMNS = ['productName', 'rating', 'platform', 'price', 'genre', 'developer'];

  readonly games = this.dashboardFacade.games;
  readonly totalGames = this.dashboardFacade.totalGames;
  readonly searchValue = signal<string>('');

  onPageChange(event: any) {
    this.dashboardFacade.getGames(this.searchValue(), this.dashboardFacade.selectedPlatform(), {
      page: event.pageIndex + 1,
      pageSize: event.pageSize,
    });
  }

  onSearchCriteriaChange() {
    this.dashboardFacade.getGames(this.searchValue(), this.dashboardFacade.selectedPlatform());
  }
}
