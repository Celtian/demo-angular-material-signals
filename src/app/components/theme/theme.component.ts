import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TranslocoPipe],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  public readonly themeService = inject(ThemeService);
}
