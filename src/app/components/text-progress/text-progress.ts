import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoPipe } from '@jsverse/transloco';
import { marker as _ } from '@jsverse/transloco-keys-manager/marker';

const config: Record<string, { text: string; icon: string }> = {
  save: {
    text: _('uni.save'),
    icon: 'save',
  },
  delete: {
    text: _('uni.delete'),
    icon: 'delete',
  },
};

export type TextProgressType = keyof typeof config;

@Component({
  selector: 'app-text-progress',
  imports: [MatProgressSpinnerModule, MatIconModule, TranslocoPipe],
  templateUrl: './text-progress.html',
  styleUrl: './text-progress.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextProgress {
  public readonly isProgressing = input.required<boolean>();
  public readonly type = input.required<TextProgressType>();
  public readonly text = computed(() => config[this.type()].text);
  public readonly icon = computed(() => config[this.type()].icon);
}
