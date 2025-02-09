import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DEFAULT_PLATFORM, DEFAULT_PLATFORM_LABEL, Game, Platform } from '@common/models';
import { GamesApiService } from '@common/services';
import { GroupedSalesMetrics, PlatformSalesMetrics, Sale } from '@dashboard/models';
import { SalesApiService } from '@dashboard/services/sales-api.service';
import { patchState, signalState } from '@ngrx/signals';
import { catchError, EMPTY } from 'rxjs';

interface DashboardState {
  platforms: Platform[];
  stats: PlatformSalesMetrics;
  currentStats: GroupedSalesMetrics;
  sales: Sale[];
  totalSales: number;
  selectedPlatform: string;
  games: Game[];
  totalGames: number;
  errors: string[];
}

@Injectable()
export class DashboardFacade {
  private readonly gamesApiService: GamesApiService = inject(GamesApiService);
  private readonly salesApiService: SalesApiService = inject(SalesApiService);

  readonly dashboardState = signalState<DashboardState>({
    platforms: [],
    stats: {},
    currentStats: {} as GroupedSalesMetrics,
    sales: [],
    totalSales: 0,
    selectedPlatform: DEFAULT_PLATFORM,
    games: [],
    totalGames: 0,
    errors: [],
  });

  readonly platforms = this.dashboardState.platforms;
  readonly stats = this.dashboardState.stats;
  readonly currentStats = this.dashboardState.currentStats;
  readonly sales = this.dashboardState.sales;
  readonly totalSales = this.dashboardState.totalSales;
  readonly selectedPlatform = this.dashboardState.selectedPlatform;
  readonly games = this.dashboardState.games;
  readonly totalGames = this.dashboardState.totalGames;
  readonly errors = this.dashboardState.errors;

  getPlatforms(): void {
    this.gamesApiService
      .getPlatforms()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe(platforms => {
        patchState(this.dashboardState, { platforms });
      });
  }

  getSalesStats(platform: string = DEFAULT_PLATFORM): void {
    if (platform === DEFAULT_PLATFORM_LABEL) {
      platform = DEFAULT_PLATFORM;
    }

    this.salesApiService
      .getStats(platform)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe(stats => {
        patchState(this.dashboardState, state => {
          return {
            ...state,
            stats: { ...state.stats, ...stats },
            currentStats: stats[platform],
            selectedPlatform: platform,
          };
        });
      });
  }

  getSales(
    searchValue: string = '',
    platform: string = DEFAULT_PLATFORM,
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 1, pageSize: 25 },
  ): void {
    if (platform === DEFAULT_PLATFORM_LABEL) {
      platform = DEFAULT_PLATFORM;
    }

    this.salesApiService
      .getTopSales(searchValue, platform, pagination)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe(data => {
        patchState(this.dashboardState, state => {
          return {
            ...state,
            sales: data.sales,
            totalSales: data.totalCount,
            selectedPlatform: platform,
          };
        });
      });
  }

  getGames(
    searchValue: string = '',
    platform: string = DEFAULT_PLATFORM,
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 1, pageSize: 25 },
  ): void {
    if (platform === DEFAULT_PLATFORM_LABEL) {
      platform = DEFAULT_PLATFORM;
    }

    this.gamesApiService
      .getGames(searchValue, platform, pagination)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe(data => {
        patchState(this.dashboardState, state => {
          return {
            ...state,
            games: data.games,
            totalGames: data.totalCount,
            selectedPlatform: platform,
          };
        });
      });
  }

  removeError(error: string) {
    patchState(this.dashboardState, state => {
      return {
        ...state,
        errors: state.errors.filter(e => e !== error),
      };
    });
  }

  private handleError(error: HttpErrorResponse): void {
    patchState(this.dashboardState, state => {
      return {
        ...state,
        errors: [...state.errors, error.error.error],
      };
    });
  }
}
