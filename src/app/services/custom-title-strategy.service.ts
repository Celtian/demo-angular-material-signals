import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';

@Injectable()
export class CustomTitleStrategyService extends TitleStrategy {
  private readonly siteName = 'Demo Angular Material Signals';
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);

  public updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.transloco.langChanges$.pipe(map(() => this.transloco.translate(title))).subscribe((translatedTitle) => {
        this.title.setTitle(`${translatedTitle} - ${this.siteName}`);
      });
    } else {
      this.title.setTitle(this.siteName);
    }
  }
}
