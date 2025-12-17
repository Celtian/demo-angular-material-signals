import { Directive, effect, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective {
  private readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      const themeType = this.themeService.themeType();
      const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.themeService.setThemeEffects({ themeType, systemSettingDark });
    });
  }
}
