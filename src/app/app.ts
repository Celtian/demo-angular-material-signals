import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { NgxFixedFooterDirective } from 'ngx-fixed-footer';
import { filter, map, startWith } from 'rxjs';

import { NgxUpdateAppDirective } from 'ngx-update-app';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemeDirective } from './components/theme/theme.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatButton,
    TranslocoPipe,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatIconModule,
    NgxFixedFooterDirective,
    ThemeComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col min-h-screen' },
  hostDirectives: [NgxUpdateAppDirective, ThemeDirective],
})
export class App {
  public readonly endYear = new Date().getFullYear(); // todo replace
  public readonly transloco = inject(TranslocoService);

  public readonly lang = toSignal(
    this.transloco.events$.pipe(
      filter((e) => e.type === 'langChanged'),
      startWith(this.transloco.getActiveLang()),
      map(() => this.transloco.getActiveLang()),
    ),
    {
      initialValue: this.transloco.getActiveLang(),
    },
  );

  protected readonly title = signal('demo-angular-material-signals');

  public toggleLanguage(): void {
    this.transloco.setActiveLang(this.transloco.getActiveLang() === 'en' ? 'cs' : 'en');
  }
}
