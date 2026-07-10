import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-docs-sidebar',
  templateUrl: './docs-sidebar.component.html',
  styleUrl: './docs-sidebar.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class DocsSidebarComponent {
  private readonly docsService = inject(DocsService);
  readonly navigation = this.docsService.navigation;
}
