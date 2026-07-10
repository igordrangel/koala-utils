import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { extractCodeText, findCopyCodeButton } from '../../utils/doc-ui';
import { contentHasMermaid, ensureMermaidLoaded } from '../../utils/mermaid-loader';
import { ensurePrismLoaded, highlightCodeBlocks } from '../../utils/prism-loader';

@Component({
  selector: 'app-markdown-content',
  template: `
    @if (renderMarkdown()) {
      <markdown
        class="prose-docs"
        ngPreserveWhitespaces
        [data]="content()"
        [disableSanitizer]="true"
        [mermaid]="usesMermaid()"
        (ready)="onReady()"
      />
    }
  `,
  imports: [MarkdownComponent],
})
export class MarkdownContentComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly content = input.required<string>();
  readonly rendered = output<void>();

  readonly renderMarkdown = signal(false);
  readonly usesMermaid = signal(false);

  constructor() {
    effect(() => {
      const content = this.content();
      untracked(() => {
        void this.prepare(content);
      });
    });
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    const button = findCopyCodeButton(event.target);
    if (!button) return;

    event.preventDefault();

    const text = extractCodeText(button);
    if (!text) return;

    void navigator.clipboard.writeText(text).then(() => {
      this.showCopiedState(button);
    });
  }

  onReady() {
    if (this.isBrowser) {
      this.highlightCode();
    }
    queueMicrotask(() => this.rendered.emit());
  }

  highlightCode() {
    highlightCodeBlocks(this.host.nativeElement);
  }

  private async prepare(content: string) {
    this.renderMarkdown.set(false);

    const usesMermaid = contentHasMermaid(content);
    this.usesMermaid.set(usesMermaid);

    if (this.isBrowser) {
      await ensurePrismLoaded();

      if (usesMermaid) {
        await ensureMermaidLoaded();
      }
    }

    this.renderMarkdown.set(true);
  }

  private showCopiedState(button: HTMLButtonElement) {
    const icon = button.querySelector('i');
    if (!icon) return;

    const previousClass = icon.className;
    icon.className = 'fa-solid fa-check';

    window.setTimeout(() => {
      icon.className = previousClass || 'fa-regular fa-clipboard';
    }, 2000);
  }
}
