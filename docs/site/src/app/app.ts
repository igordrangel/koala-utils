import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { DocsSidebarComponent } from './core/components/docs-sidebar/docs-sidebar.component';
import { SearchDialogComponent } from './core/components/search-dialog/search-dialog.component';
import { SiteFooterComponent } from './core/components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './core/components/site-header/site-header.component';
import { UI_COPY } from './core/i18n/ui-copy';
import { LocaleService } from './core/services/locale.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    SiteHeaderComponent,
    SiteFooterComponent,
    SearchDialogComponent,
    DocsSidebarComponent,
  ],
})
export class App {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly localeService = inject(LocaleService);
  private readonly seo = inject(SeoService);

  readonly isDocPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.localeService.isDocsUrl(this.router.url)),
      startWith(this.localeService.isDocsUrl(this.router.url)),
    ),
    { initialValue: this.localeService.isDocsUrl(this.router.url) },
  );

  readonly mainSectionClass = computed(() => {
    const base = 'min-w-0 flex-1 mt-16 min-h-[calc(100vh-4rem)] flex flex-col';
    return this.isDocPage() ? `${base} lg:ml-60` : base;
  });

  readonly mainContentClass = computed(() =>
    this.isDocPage() ? 'flex-1 px-6' : 'flex-1 px-0',
  );

  constructor() {
    this.viewportScroller.setOffset([0, 250]);

    effect(() => {
      const locale = this.localeService.locale();
      this.document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.localeService.isDocsUrl(this.router.url)) {
        return;
      }

      const locale = this.localeService.locale();
      const copy = UI_COPY[locale];

      this.seo.update({
        title: copy.seo.landingTitle,
        description: copy.metaDescription,
        path: this.router.url.split('?')[0] || `/${locale}`,
        locale,
      });
    });

    this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)).subscribe((e) => {
      if (e.anchor) {
        setTimeout(() => this.viewportScroller.scrollToAnchor(e.anchor!), 0);
      }
    });
  }
}
