import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Button } from '@/shared/components/button';
import { APP_VERSION } from '../../constants/app-version';
import { UI_COPY } from '../../i18n/ui-copy';
import { CopyFeedbackButtonComponent } from '../copy-feedback-button/copy-feedback-button.component';
import { DocsSidebarComponent } from '../docs-sidebar/docs-sidebar.component';
import { GithubStarsComponent } from '../github-stars/github-stars.component';
import { absoluteSiteUrl } from '../../config/site-seo';
import { LocaleService } from '../../services/locale.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  imports: [
    Button,
    RouterLink,
    RouterLinkActive,
    DocsSidebarComponent,
    GithubStarsComponent,
    CopyFeedbackButtonComponent,
    NgTemplateOutlet,
  ],
})
export class SiteHeaderComponent {
  private readonly searchService = inject(SearchService);
  private readonly localeService = inject(LocaleService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly version = `v${APP_VERSION}`;
  readonly mobileMenuVisible = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly locale = this.localeService.locale;

  readonly copy = computed(() => UI_COPY[this.localeService.locale()]);

  readonly homeLink = computed(() => this.localeService.homeRoute());
  readonly docsNavLink = computed(() => this.localeService.docsRootRoute());
  readonly llmsUrl = () => absoluteSiteUrl(this.localeService.llmsFile());

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.mobileMenuVisible()) {
          this.closeMobileMenu();
        }
      });
  }

  switchLocale(target: 'pt') {
    if (target === this.localeService.locale()) return;
    void this.router.navigateByUrl(this.localeService.switchLocalePath(target));
  }

  toggleMobileMenu() {
    const visible = this.mobileMenuVisible();
    if (!visible) {
      this.mobileMenuVisible.set(true);
      this.mobileMenuOpen.set(true);
      return;
    }

    this.closeMobileMenu();
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    setTimeout(() => this.mobileMenuVisible.set(false), 200);
  }

  triggerSearch() {
    this.searchService.show();
  }
}
