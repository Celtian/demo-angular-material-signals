import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { filter, map, pairwise, startWith } from 'rxjs';

@Injectable()
export class CustomTitleStrategyService extends TitleStrategy {
  private readonly siteName = 'Demo Angular Material Signals';
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);

  public updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.transloco.events$
        .pipe(
          pairwise(),
          filter(([prev, curr]) => prev.type === 'langChanged' || curr.type === 'translationLoadSuccess'),
          startWith(this.transloco.getActiveLang()),
        )
        .pipe(map(() => this.transloco.translate(title)))
        .subscribe((translatedTitle) => {
          this.title.setTitle(`${translatedTitle} - ${this.siteName}`);
        });
    } else {
      this.title.setTitle(this.siteName);
    }
  }
}
