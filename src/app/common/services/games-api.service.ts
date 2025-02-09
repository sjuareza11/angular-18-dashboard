import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Platform } from '@common/models';
import { map, Observable } from 'rxjs';

@Injectable()
export class GamesApiService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.baseUrl}/platforms`);
  }

  getGames(
    searchValue: string,
    platform: string,
    pagination: {
      page: number;
      pageSize: number;
    },
  ): Observable<{
    games: Game[];
    totalCount: number;
  }> {
    return this.http.get<{
      games: Game[];
      totalCount: number;
    }>(`${this.baseUrl}/games/${platform}`, {
      params: {
        page: pagination.page.toString(),
        limit: pagination.pageSize.toString(),
        search: searchValue || '',
      },
    });
  }

  searchGame(id: string): Observable<Game> {
    return this.http.get<{ data: Game }>(`${this.baseUrl}/game/${id}`).pipe(map(res => res.data));
  }
}
