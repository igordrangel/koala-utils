import { NgTemplateOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Button } from '@/shared/components/button';
import { copyWithFeedback } from '../../utils/clipboard';

export type CopyFeedbackVariant = 'ghost' | 'outline';

@Component({
  selector: 'app-copy-feedback-button',
  templateUrl: './copy-feedback-button.component.html',
  imports: [Button, NgTemplateOutlet],
})
export class CopyFeedbackButtonComponent {
  readonly label = input.required<string>();
  readonly shortLabel = input<string>();
  readonly copiedLabel = input.required<string>();
  readonly variant = input<CopyFeedbackVariant>('outline');
  readonly class = input('');
  readonly getText = input.required<() => string>();

  readonly copied = signal(false);

  copy() {
    const text = this.getText()();
    if (!text) return;

    void copyWithFeedback(this.copied, text);
  }
}
