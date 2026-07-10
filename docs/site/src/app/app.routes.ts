import { Routes } from "@angular/router";
import { docMarkdownProviders } from "./core/providers/doc-markdown.providers";
import { localeGuard } from "./core/guards/locale.guard";
import { DocPageComponent } from "./features/doc/doc-page.component";
import { LandingPageComponent } from "./features/landing/landing-page.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "pt",
    pathMatch: "full",
  },
  {
    path: "pt/docs",
    redirectTo: "pt/docs/inicio/instalacao",
    pathMatch: "full",
  },
  {
    path: "en/docs",
    redirectTo: "en/docs/getting-started/installation",
    pathMatch: "full",
  },
  {
    path: ":locale",
    component: LandingPageComponent,
    canActivate: [localeGuard],
    title: "@koalarx/utils",
  },
  {
    path: ":locale/docs/:category/:slug",
    component: DocPageComponent,
    canActivate: [localeGuard],
    providers: docMarkdownProviders,
  },
  {
    path: "**",
    redirectTo: "pt",
  },
];
