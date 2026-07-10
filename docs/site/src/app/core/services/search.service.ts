import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly open = signal(false);

  show() {
    this.open.set(true);
  }

  hide() {
    this.open.set(false);
  }
}
