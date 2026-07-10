import { MARKED_OPTIONS, MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { createDocsMarkedRenderer } from '../utils/marked-setup';
import { docsMermaidOptions } from '../utils/mermaid-config';

export const docMarkdownProviders = [
  provideMarkdown({
    markedOptions: {
      provide: MARKED_OPTIONS,
      useValue: { renderer: createDocsMarkedRenderer() },
    },
    mermaidOptions: {
      provide: MERMAID_OPTIONS,
      useValue: docsMermaidOptions,
    },
  }),
];
