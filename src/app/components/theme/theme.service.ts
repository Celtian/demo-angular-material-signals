import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { StorageUtils } from '../../utils/storage';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeConfig {
  defaultTheme: ThemeType;
  localStorageKey: string;
}

interface CoerceTheme {
  defaultThemeType: ThemeType;
  themeType?: string | null;
}

interface ThemeChange {
  themeType: ThemeType;
  systemSettingDark: boolean;
}

export const coerceTheme = ({ themeType, defaultThemeType }: CoerceTheme): ThemeType => {
  switch (themeType) {
    case 'light':
    case 'dark':
    case 'system':
      return themeType;
    default:
      return defaultThemeType;
  }
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly config: ThemeConfig = {
    localStorageKey: 'THEME_TYPE',
    defaultTheme: 'system',
  };

  private readonly _themeType = signal<ThemeType>(
    coerceTheme({
      defaultThemeType: this.config.defaultTheme,
      themeType: StorageUtils.getItem(this.config.localStorageKey),
    }),
  );
  public readonly themeType = computed(() => this._themeType());

  constructor() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.setThemeEffects({
        themeType: this._themeType(),
        systemSettingDark: event.matches,
      });
    });
    StorageUtils.watchCrossTab(this.handleChange.bind(this));
    StorageUtils.watchCurrentTab(this.handleChange.bind(this));
  }

  private handleChange(key: string, value: string | null) {
    if (key === this.config.localStorageKey) {
      this._themeType.set(
        coerceTheme({
          defaultThemeType: this.config.defaultTheme,
          themeType: value,
        }),
      );
    }
  }

  public setThemeType(themeType: ThemeType): void {
    StorageUtils.setItem(this.config.localStorageKey, themeType);
  }

  public setThemeEffects({ themeType, systemSettingDark }: ThemeChange): void {
    if (themeType === 'dark' || (themeType === 'system' && systemSettingDark)) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }
}
