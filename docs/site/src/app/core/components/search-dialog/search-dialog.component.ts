import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UI_COPY } from '../../i18n/ui-copy';
import { DocsService } from '../../services/docs.service';
import { LocaleService } from '../../services/locale.service';
import { SearchService } from '../../services/search.service';
import { shouldCloseSearchDialog, shouldOpenSearchDialog } from '../../utils/doc-ui';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
})
export class SearchDialogComponent {
  private readonly docsService = inject(DocsService);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);
  private readonly localeService = inject(LocaleService);

  readonly query = signal('');
  readonly results = signal<{ title: string; description: string; route: string }[]>([]);

  readonly visible = this.searchService.open;
  readonly copy = computed(() => UI_COPY[this.localeService.locale()]);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (shouldOpenSearchDialog(event)) {
      event.preventDefault();
      this.searchService.show();
    }
    if (shouldCloseSearchDialog(event)) {
      this.searchService.hide();
    }
  }

  onQueryChange(value: string) {
    this.query.set(value);
    this.results.set(this.docsService.search(value));
  }

  goTo(route: string) {
    this.searchService.hide();
    this.query.set('');
    this.results.set([]);
    void this.router.navigateByUrl(route);
  }

  close() {
    this.searchService.hide();
  }
}
