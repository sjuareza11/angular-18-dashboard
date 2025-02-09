import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '@common/models';
import { GamesApiService } from '@common/services';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  providers: [GamesApiService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly gameApiService = inject(GamesApiService);

  readonly game: WritableSignal<Game | null> = signal(null);

  ngOnInit() {
    const gameId: string = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.getGame(gameId);
  }

  private getGame(gameId: string) {
    this.gameApiService
      .searchGame(gameId)
      .pipe(
        catchError(() => {
          this.router.navigate(['/']);
          return EMPTY;
        }),
      )
      .subscribe(game => {
        this.game.set(game);
        console.log(game);
      });
  }
}
