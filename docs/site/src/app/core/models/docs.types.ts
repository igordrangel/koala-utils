export interface DocHeading {
  level: number;
  text: string;
  id: string;
}

export interface DocPage {
  title: string;
  slug: string;
  category: string;
  docKey: string;
  locale: string;
  order: number;
  description: string;
  route: string;
  alternateRoute: string;
  mdRel: string;
  content: string;
  headings: DocHeading[];
}

export interface NavItem {
  title: string;
  slug: string;
  description: string;
  route: string;
}

export interface NavSection {
  category: string;
  label: string;
  items: NavItem[];
}

export interface LocaleManifest {
  navigation: NavSection[];
  docs: DocPage[];
}

export interface DocsManifest {
  generatedAt: string;
  defaultLocale: string;
  supportedLocales: string[];
  locales: Record<string, LocaleManifest>;
}
