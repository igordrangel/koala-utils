import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI_COPY } from '../../i18n/ui-copy';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  imports: [RouterLink],
})
export class SiteFooterComponent {
  private readonly localeService = inject(LocaleService);

  readonly isDocPage = input(false);

  readonly copy = computed(() => UI_COPY[this.localeService.locale()]);
  readonly installGuideLink = computed(() => this.localeService.defaultDocsRoute());
  readonly llmsLink = computed(() => this.localeService.llmsFile());
  readonly llmLink = computed(() =>
    this.localeService.locale() === 'pt' ? '/llm.txt' : `/llm-${this.localeService.locale()}.txt`,
  );

  readonly footerClass = computed(() => {
    if (this.isDocPage()) {
      return 'w-full md:w-[calc(100%-16rem)]';
    }

    return 'w-full';
  });
}
